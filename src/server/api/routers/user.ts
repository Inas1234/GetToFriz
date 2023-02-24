import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import cookie from "cookie";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

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
});
