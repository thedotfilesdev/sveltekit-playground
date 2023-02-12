import { createCaller } from '$lib/server/api/trpc';
import type { PageServerLoad } from './$types';

// 👇 since this is only called on the server, we can bypass HTTP 💡
export const load: PageServerLoad = async (event) => {
  event.depends('app:random');

  return {
    greeting: (await createCaller(event)).greeting.greeting()
  };
};
