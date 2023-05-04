import { DriveEtaSharp } from "@mui/icons-material";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  driverProcedure,
} from "../trpc";

export const orderRouter = createTRPCRouter({
  uploadOrder: protectedProcedure
    .input(
      z.object({
        personalAddress: z.string(),
        items: z.string(),
        personalLatitude: z.number(),
        personalLongitude: z.number(),
        pickupLatitude: z.number(),
        pickupLongitude: z.number(),
        pickupAddress: z.string(),
        timeframe: z.string(),
        userId: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.deliveryOrder.create({ data: { ...input } });
    }),

  getOrders: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const orders = await ctx.prisma.deliveryOrder.findMany({
        where: { userId: input },
        include: { Driver: true, User: true },
      });

      return orders;
    }),

  driveForOrder: driverProcedure
    .input(z.object({ userId: z.string(), orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.deliveryOrder.update({
        where: { id: input.orderId },
        data: { driverId: input.userId },
      });
    }),

  getDriverOrders: driverProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const driver = await ctx.prisma.deliveryOrder.findMany({
        where: { driverId: input },
        include: { User: true, Driver: true },
      });
      return driver;
    }),

  getAllOrders: protectedProcedure.query(async ({ ctx, input }) => {
    const allOrders = await ctx.prisma.deliveryOrder.findMany({
      include: { User: true, Driver: true },
    });

    return allOrders;
  }),
});
