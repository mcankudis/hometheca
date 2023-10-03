import type { AppRouter } from '@hometheca/server';

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

export const api = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc'
        })
    ]
});
