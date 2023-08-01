import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import aws from "aws-sdk";
import fs from "fs";

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
        await ctx.prisma.salons.create({
          data: {
            email: email,
            password: password,
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
