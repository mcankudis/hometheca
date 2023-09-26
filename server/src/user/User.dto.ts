import { Locale } from '@hometheca/shared';
import { z } from 'zod';

export const LocaleValues = [Locale.EN, Locale.DE, Locale.PL] as const;

export const CreateUserDTO = z.object({
    username: z.string().min(4).max(32), // todo translated error messages
    email: z.string().email(),
    password: z.string().min(8).max(32),
    locale: z.enum(LocaleValues)
});

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;
