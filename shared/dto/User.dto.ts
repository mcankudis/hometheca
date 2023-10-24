import { z } from 'zod';

import { Locale } from '../types';

// todo translated error messages

export const LocaleValues = [Locale.EN, Locale.DE, Locale.PL] as const;

export const CreateUserDTO = z.object({
    username: z.string().min(4).max(32),
    email: z.string().email(),
    password: z.string().min(8).max(32),
    locale: z.enum(LocaleValues)
});

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;

export const verifyEmailDTO = z.object({
    emailVerificationToken: z.string()
});

export type verifyEmailDTO = z.infer<typeof verifyEmailDTO>;

export const LoginUserDTO = z.object({
    username: z.string().min(4).max(32),
    password: z.string().min(8).max(32)
});

export type LoginUserDTO = z.infer<typeof LoginUserDTO>;

export interface UserData {
    id: string;
    username: string;
    locale: Locale;
}
