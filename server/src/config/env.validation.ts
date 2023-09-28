import { z } from 'zod';

const envVars = z.object({
    DB_CONNECTION_STRING: z.string(),
    DATADOG_URL: z.string(),
    DATADOG_API_KEY: z.string(),
    environment: z.string().optional().default('production'),
    MAIL_HOST: z.string(),
    MAIL_USER: z.string(),
    MAIL_PASSWORD: z.string(),
    MAIL_ADDRESS: z.string(),
    SERVER_PATH: z.string()
});

export type EnvVars = z.infer<typeof envVars>;

export const validate = (config: Record<string, unknown>): EnvVars => {
    return envVars.parse(config);
};
