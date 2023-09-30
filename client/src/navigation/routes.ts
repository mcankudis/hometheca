import { Component } from 'solid-js';

import { LoginView, RegisterView } from '@login';
import { Paths } from '../paths';

interface Route {
    name: string;
    path: string;
    component: Component;
    type: 'public' | 'private';
}

// todo translate names
export const routes: Route[] = [
    {
        name: 'Login',
        path: Paths.LOGIN,
        component: LoginView,
        type: 'public'
    },
    {
        name: 'Register',
        path: Paths.REGISTER,
        component: RegisterView,
        type: 'public'
    }
];
