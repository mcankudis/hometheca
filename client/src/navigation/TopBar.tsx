import { A } from '@solidjs/router';
import { AppBar, Box, Button, Toolbar } from '@suid/material';
import { Component, For } from 'solid-js';

import { logo_nav } from '@assets';
import { routes } from './routes';

export const TopBar: Component = () => {
    return (
        <AppBar
            position="static"
            color="transparent"
            sx={{
                boxShadow: 'none',
                display: { xs: 'none', md: 'block' }
            }}
        >
            <Toolbar>
                <img src={logo_nav} alt="Hometheca" height={64} />
                <Box flexGrow={1} displayRaw="flex" justifyContent="right">
                    <For each={routes}>
                        {(item) => (
                            <Button color="info">
                                <A href={item.path}>{item.name}</A>
                            </Button>
                        )}
                    </For>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
