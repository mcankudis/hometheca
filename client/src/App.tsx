import { Route, Routes, useNavigate } from '@solidjs/router';
import { ThemeProvider } from '@suid/material';
import { For, type Component } from 'solid-js';

import { BottomNav, routes } from '@navigation';
import { api } from './api';
import { TopBar } from './navigation/TopBar';
import { Paths } from './paths';
import { theme } from './styles/theme';
import { userStore } from './user/userStore';

export const App: Component = () => {
    const navigate = useNavigate();

    const init = async () => {
        try {
            const user = await api.user.getUserData.query();
            console.log('user', user);
            userStore.setUser(user);
        } catch (error) {
            // todo display error
            navigate(Paths.LOGIN, { replace: true });
        }
    };

    init();

    return (
        <ThemeProvider theme={theme}>
            <TopBar />
            <Routes>
                <For each={routes}>
                    {({ path, component }) => (
                        <Route path={path} component={component} />
                    )}
                </For>
            </Routes>
            <BottomNav />
        </ThemeProvider>
    );
};
