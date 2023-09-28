import { Locale } from '@hometheca/shared';

export interface Account {
    email: string;
    emailVerifiedAt?: Date;
    emailVerificationToken?: string;
    password: string;
    lastLogin?: Date;
}

export interface User {
    username: string;
    locale: Locale;
    account: Account;
}
