import { z } from 'zod';

const envVars = z.object({
    DB_CONNECTION_STRING: z.string()
});

export type EnvVars = z.infer<typeof envVars>;

export const validate = (config: Record<string, unknown>): EnvVars => {
    return envVars.parse(config);
};
