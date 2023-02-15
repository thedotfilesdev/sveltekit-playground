import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals?.getSession();

  if (!session && !event.url.toString().includes('login')) {
    throw redirect(307, '/login');
  }

  return {
    session
  };
};
