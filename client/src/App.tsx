import { Route, Router, Routes } from '@solidjs/router';
import { ThemeProvider } from '@suid/material';
import { For, type Component } from 'solid-js';

import { BottomNav, routes } from '@navigation';
import { TopBar } from './navigation/TopBar';
import { theme } from './styles/theme';

const App: Component = () => {
    return (
        <Router>
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
        </Router>
    );
};

export default App;
