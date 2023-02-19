import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/Authentication";
import { orderRouter } from "./routers/orders";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
