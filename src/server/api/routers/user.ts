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
      const jwt = await new SignJWT({ username: user.firstName })
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("1h")
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
      return { username: payload.username };
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
});
