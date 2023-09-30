import { Favorite, LocationOn, Restore } from '@suid/icons-material';
import { BottomNavigation, BottomNavigationAction, Box } from '@suid/material';
import { Component, createSignal } from 'solid-js';

export const BottomNav: Component = () => {
    const [value, setValue] = createSignal(0);

    return (
        <Box
            sx={{
                display: { md: 'none', xs: 'block' }
            }}
        >
            <BottomNavigation
                value={value()}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Recents" icon={<Restore />} />
                <BottomNavigationAction label="Favorites" icon={<Favorite />} />
                <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
            </BottomNavigation>
        </Box>
    );
};
