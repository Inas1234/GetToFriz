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
        premium: z.boolean(),
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
          premium,
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
            premium: premium,
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
  searchSalobyEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input: { email }, ctx }) => {
      const { prisma } = ctx;
      const salon = await prisma.salons.findUnique({ where: { email } });
      return salon;
    }),
  premiumSalons: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    const salons = await prisma.salons.findMany({ where: { premium: true } });
    return salons;
  }),
  addService: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        email: z.string(),
        price: z.number(),
        gender: z.string(),
        duration: z.number(),
      })
    )
    .mutation(
      async ({
        input: { name, description, email, gender, duration, price },
        ctx,
      }) => {
        const salon = await ctx.prisma.salons.findUnique({ where: { email } });
        if (!salon) {
          throw new Error("Salon does not exist");
        }

        let service = await ctx.prisma.services.findFirst({
          where: { name: name },
        });

        if (!service) {
          service = await ctx.prisma.services.create({
            data: {
              name: name,
              description: description,
            },
          });
        }

        const existingSalonService = await ctx.prisma.salonServices.findFirst({
          where: {
            salonId: salon.id,
            serviceId: service.id,
          },
        });

        if (existingSalonService) {
          if (gender.toLowerCase() === "men") {
            await ctx.prisma.salonServices.update({
              where: { id: existingSalonService.id },
              data: { price_for_men: price },
            });
          } else if (gender.toLowerCase() === "women") {
            await ctx.prisma.salonServices.update({
              where: { id: existingSalonService.id },
              data: { price_for_women: price },
            });
          }
        } else {
          await ctx.prisma.salonServices.create({
            data: {
              salonId: salon.id,
              serviceId: service.id,
              price_for_men: gender.toLowerCase() === "men" ? price : 0,
              price_for_women: gender.toLowerCase() === "women" ? price : 0,
              duration: duration,
            },
          });
        }

        return "Service added/updated";
      }
    ),
  getServicesByGender: publicProcedure
    .input(z.object({ gender: z.string() }))
    .query(async ({ input: { gender }, ctx }) => {
      const { prisma } = ctx;

      if (gender.toLowerCase() === "men") {
        const servicesForMen = await prisma.salonServices.findMany({
          where: {
            price_for_men: {
              not: 0, // or you can use NOT_NULL based on your DB setup
            },
          },
          include: {
            service: true, // This will include the service details in the returned result
          },
        });
        return servicesForMen.map((service) => ({
          name: service.service.name,
          price: service.price_for_men,
          duration: service.duration,
        }));
      } else if (gender.toLowerCase() === "women") {
        const servicesForWomen = await prisma.salonServices.findMany({
          where: {
            price_for_women: {
              not: 0,
            },
          },
          include: {
            service: true,
          },
        });
        return servicesForWomen.map((service) => ({
          name: service.service.name,
          price: service.price_for_women,
          duration: service.duration,
        }));
      }

      throw new Error("Invalid gender provided");
    }),
});
