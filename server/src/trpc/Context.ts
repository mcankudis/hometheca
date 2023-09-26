import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

import { Session } from '@auth';

export const createContext = (ctx: trpcExpress.CreateExpressContextOptions) => {
    const session = null as Session | null;
    return { ...ctx, session };
};

export type Context = inferAsyncReturnType<typeof createContext>;
