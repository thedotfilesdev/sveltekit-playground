import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const greetingRouter = createTRPCRouter({
  greeting: publicProcedure.query(async () => {
    return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
  }),
  protectedGreeting: protectedProcedure.query(async ({ ctx }) => {
    console.log({ session: ctx.session });

    return 'protected greetiner';
  })
});
