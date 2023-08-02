import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import aws from "aws-sdk";
import fs from "fs";
import bcrypt from "bcrypt";

const s3 = new aws.S3({
  endpoint: "https://salon.images.fra1.digitaloceanspaces.com",
  credentials: {
    accessKeyId: "DO00FNPPZNQR6YNVTXUE",
    secretAccessKey: "K6YAHLX2JcexeS3AFMRzeF6dlj0Cf2SiviqBFzY9BDA",
  },
});

export const salonRouter = createTRPCRouter({
  createSalon: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        firstname: z.string(),
        lastname: z.string(),
        phoneNumber: z.string(),
        gender: z.string(),
        image: z.string(),
        description: z.string(),
        openTime: z.string(),
        closeTime: z.string(),
      })
    )
    .mutation(
      async ({
        input: {
          email,
          password,
          firstname,
          lastname,
          phoneNumber,
          gender,
          image,
          description,
          openTime,
          closeTime,
          name,
        },
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
        await ctx.prisma.salons.create({
          data: {
            email: email,
            password: hashedPassword,
            firstName: firstname,
            lastName: lastname,
            phoneNumber: phoneNumber,
            image: image,
            description: description,
            time_open: openTime,
            time_close: closeTime,
            gender: gender,
            name: name,
          },
        });

        return "Salon created";
      }
    ),
});
