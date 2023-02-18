import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getForwardGeoCoding: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const data = await fetch(
        `https://api.mapbox.com/geocoding/v5/places/${"50973 Richard Dr"}.json`
      );

      return data;
    }),
});
