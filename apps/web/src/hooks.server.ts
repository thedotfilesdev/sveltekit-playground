import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import Credentials from '@auth/core/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { appRouter } from '$lib/server/api/root';
import { createContext } from '$lib/server/api/trpc';

console.log({ GITHUB_ID, GITHUB_SECRET, AUTH_SECRET });

const prisma = new PrismaClient();

export const authHandle = SvelteKitAuth({
  secret: AUTH_SECRET,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  debug: true,
  providers: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Sign in',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: 'Email', type: 'email', placeholder: 'username@domain.com' },
        password: { label: 'Password', type: 'password' }
      }
    })
  ]
});

export const trpcHandle: Handle = createTRPCHandle({
  router: appRouter,
  createContext
});

export const handle = sequence(authHandle, trpcHandle);
