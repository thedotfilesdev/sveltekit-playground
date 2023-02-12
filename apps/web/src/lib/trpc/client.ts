import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type { IAppRouter } from './router/_app';

let browserClient: ReturnType<typeof createTRPCClient<IAppRouter>>;

export function trpc(init?: TRPCClientInit) {
  if (typeof window === 'undefined') return createTRPCClient<IAppRouter>({ init });
  if (!browserClient) browserClient = createTRPCClient<IAppRouter>();
  return browserClient;
}
