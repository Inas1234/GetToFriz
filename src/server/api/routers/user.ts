import { boolean, z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import cookie from "cookie";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJWTSecret, verifyAuth } from "../../../lib/auth";

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
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await ctx.prisma.users.create({
          data: {
            email,
            password: hashedPassword,
            firstName: firstname,
            lastName: lastname,
            phoneNumber,
            gender,
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
