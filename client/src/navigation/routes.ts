import { Component } from 'solid-js';

import { LoginView, RegisterView } from '@login';
import { HomeView } from '../home/Home.view';
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
        name: 'Home',
        path: Paths.HOME,
        component: HomeView,
        type: 'private'
    },
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
