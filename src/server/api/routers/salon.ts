import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcrypt";

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
        city: z.string(),
        address: z.string(),
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
          city,
          address,
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
            city: city,
            address: address,
          },
        });

        return "Salon created";
      }
    ),
  searchSalons: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input: { query }, ctx }) => {
      const { prisma } = ctx;
      const lowerCaseQuery = query.toLowerCase();
      const salons = await prisma.salons.findMany();

      const filteredSalons = salons.filter((salon) =>
        salon.name.toLowerCase().includes(lowerCaseQuery)
      );

      return filteredSalons;
    }),
  searchSalobyId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const { prisma } = ctx;
      const salon = await prisma.salons.findUnique({ where: { id } });
      return salon;
    }),
});
