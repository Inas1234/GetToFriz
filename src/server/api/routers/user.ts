import { z } from "zod";

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
      const user = await ctx.prisma.users.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Incorrect password");
      }
      const jwt = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(getJWTSecret()));

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        })
      );

      return { user, jwt };
    }),
  isLoggedIn: publicProcedure
    .input(
      z.object({
        token: z.string(),
        email: z.string().email(),
      })
    )
    .query(async ({ input: { token, email }, ctx }) => {
      const { prisma } = ctx;
      const { jti } = await verifyAuth(token);
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return { user };
    }),
});
