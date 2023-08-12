import { boolean, z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import cookie from "cookie";
import bcrypt from "bcrypt";
import jose, { JWTPayload, SignJWT, decodeJwt } from "jose";
import { nanoid } from "nanoid";
import { getJWTSecret, verifyAuth } from "../../../lib/auth";
import nodemailer from "nodemailer";
/*import { Twilio } from 'twilio';

const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
*/

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

function isJWTPayload(payload: any): payload is JWTPayload {
  return typeof payload.email === 'string'; 
}

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        firstname: z.string(),
        lastname: z.string(),
        phoneNumber: z.string(),
        gender: z.string(),
      })
    )
    .mutation(
      async ({
        input: { email, password, firstname, lastname, phoneNumber, gender },
        ctx,
      }) => {
        const [existingUser, existingSalon] = await Promise.all([
          ctx.prisma.users.findUnique({ where: { email } }),
          ctx.prisma.salons.findUnique({ where: { email } }),
        ]);
        if (existingUser || existingSalon) {
          throw new Error("User already exists");
        }

        // U slucaju da se vratimo na twilio
        /*if (typeof process.env.TWILIO_VERIFICATION_SID === 'undefined') {
          throw new Error("TWILIO_VERIFICATION_SID is not defined in the environment variables.");
        }
        const verification = await twilioClient.verify.v2.services(process.env?.TWILIO_VERIFICATION_SID)
          .verifications.create({ to: phoneNumber, channel: 'sms' });

        if (verification.status !== 'pending') {
          throw new Error("Failed to send verification code");
        }*/
        const jwt = await new SignJWT({ email })
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("24h")
          .sign(new TextEncoder().encode(getJWTSecret()));

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await ctx.prisma.users.create({
          data: {
            email: email,
            password: hashedPassword,
            firstName: firstname,
            lastName: lastname,
            phoneNumber: phoneNumber,
            gender: gender,
          },
        });

        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${jwt}`;

        await transporter.sendMail({
          from: 'frizzybusinessteam@gmail.com',
          to: email, 
          subject: 'Email Verification', 
          text: `Please click on the following link to verify your email: ${verificationLink}`, 
          html: `<b>Please click on the following link to verify your email:</b> <a href="${verificationLink}">Verify Email</a>`, 
        });
        
        return { token: jwt };
      }
    ),
    sendEmail: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          token: z.string(),
        })
      )
      .mutation(
        async ({ input: { token, email }, ctx }) => {
          const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

          await transporter.sendMail({
            from: 'frizzybusinessteam@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Please click on the following link to verify your email: ${verificationLink}`,
            html: `<b>Please click on the following link to verify your email:</b> <a href="${verificationLink}">Verify Email</a>`, 
          });
          console.log("Email sent");
        }
        
      ),
    confirmEmail: publicProcedure
      .input(
        z.object({
          token: z.string(),
        })
      )
      .mutation(
        async ({ input: { token }, ctx }) => {
          console.log(token);
          let payload: JWTPayload;
          try {
            const decodedJWT = decodeJwt(token);
            console.log(decodedJWT);
            if (isJWTPayload(decodedJWT)) {
              payload = decodedJWT;
            } else {
              throw new Error("Invalid JWT payload structure");
            }
          
          } catch (err) {
              throw new Error("Unable to decode JWT");
          }
          const email = payload.email;
          // U slucaju da se vratimo na twilio
          /*if (typeof process.env.TWILIO_VERIFICATION_SID === 'undefined') {
            throw new Error("TWILIO_VERIFICATION_SID is not defined in the environment variables.");
          }

          const verificationCheck = await twilioClient.verify.v2.services(process.env.TWILIO_VERIFICATION_SID)
            .verificationChecks.create({ to: phoneNumber, code: verificationCode });

          if (verificationCheck.status !== 'approved') {
            throw new Error("Verification code is invalid");
          }*/

          const user = await ctx.prisma.users.update({
            where: {
              email: email as string,
            },
            data: {
              activated: true,
            },
          });

          return user;
        }
      ),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input: { email, password }, ctx }) => {
      const { res } = ctx;
      const [user, salon] = await Promise.all([
        ctx.prisma.users.findUnique({ where: { email } }),
        ctx.prisma.salons.findUnique({ where: { email } }),
      ]);

      let passwordMatch = false;
      let username = "unknown";
      let isSalon = false;
      if (!user && !salon) {
        throw new Error("User/Salon does not exist");
      } else if (user) {
        passwordMatch = await bcrypt.compare(password, user.password);
        username = user.firstName;
      } else if (salon) {
        passwordMatch = await bcrypt.compare(password, salon.password);
        username = salon.firstName;
        isSalon = true;
      }
      if (user && !user.activated) {
        throw new Error("Account not activated. Please check your email for an activation link.");
      }
      if (!passwordMatch) {
        throw new Error("Incorrect password");
      }
      const jwt = await new SignJWT({ username, isSalon, email })
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(new TextEncoder().encode(getJWTSecret()));

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", jwt, {
          secure: process.env.NODE_ENV === "production",
          path: "/",
        })
      );

      return { user, jwt };
    }),
  getUsername: publicProcedure
    .input(z.object({ token: z.any() }))
    .query(async ({ input: { token }, ctx }) => {
      const { prisma } = ctx;
      const payload = await verifyAuth(token);
      return { username: payload.username, isSalon: payload.isSalon };
    }),
  getEmail: publicProcedure
    .input(z.object({ token: z.any() }))
    .query(async ({ input: { token }, ctx }) => {
      const { prisma } = ctx;
      const payload = await verifyAuth(token);
      return { email: payload.email, isSalon: payload.isSalon };
    }),
  logout: publicProcedure.mutation(async ({ ctx }) => {
    const { res } = ctx;
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(0),
      })
    );
    return { success: true };
  }),
  updateProfile: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        newEmail: z.string().email(),
        password: z.string().min(8),
        firstname: z.string(),
        lastname: z.string(),
        phoneNumber: z.string(),
      })
    )
    .mutation(
      async ({
        input: { email, newEmail, password, firstname, lastname, phoneNumber },
        ctx,
      }) => {
        const user = await ctx.prisma.users.findUnique({ where: { email } });
        const { res } = ctx;
        let isSalon = false;
        if (!user) {
          throw new Error("User does not exist");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        await ctx.prisma.users.update({
          where: { email },
          data: {
            firstName: firstname,
            lastName: lastname,
            email: newEmail,
            phoneNumber: phoneNumber,
          },
        });

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", "", {
            maxAge: -1, // Expire the cookie immediately
            path: "/",
          })
        );
        const jwt = await new SignJWT({ username: firstname, isSalon, email: newEmail })
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("24h")
          .sign(new TextEncoder().encode(getJWTSecret()));

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", jwt, {
            secure: process.env.NODE_ENV === "production",
            path: "/",
          })
        );

        return { user, jwt };
      }
    ),
    updateProfilePassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        oldPassword: z.string().min(8),
        newPassword: z.string().min(8),
        newPasswordConfirm: z.string().min(8),
      })
    )
    .mutation(
      async ({
        input: { email, oldPassword, newPassword, newPasswordConfirm },
        ctx,
      }) => {
        const user = await ctx.prisma.users.findUnique({ where: { email } });

        if (!user) {
          throw new Error("User does not exist");
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        if (newPassword !== newPasswordConfirm) {
          throw new Error("Passwords do not match");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await ctx.prisma.users.update({
          where: { email },
          data: {
            password: hashedPassword,
          },
        });
        return { success: true };
      }
    ),
});
