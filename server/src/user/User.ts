import { Locale } from '@hometheca/shared';

export interface Account {
    email: string;
    emailVerifiedAt?: Date;
    password: string;
    lastLogin?: Date;
}

export interface User {
    username: string;
    locale: Locale;
    account: Account;
}
