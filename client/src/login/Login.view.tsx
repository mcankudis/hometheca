import { A } from '@solidjs/router';
import { Box, Button, Container, TextField, Typography } from '@suid/material';
import { createSignal } from 'solid-js';

import { logo } from '@assets';
import { api } from '../api';
import { Paths } from '../paths';

export const LoginView = () => {
    const [username, setUsername] = createSignal('');
    const [password, setPassword] = createSignal('');

    const login = async () => {
        const response = await api.user.login.mutate({
            username: username(),
            password: password()
        });
        console.log(response);
    };

    return (
        <Container maxWidth="sm">
            <Box
                mt={4}
                displayRaw="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
            >
                <img src={logo} alt="logo" width={256} />
                <Typography variant="h4">Login in Hometheca</Typography>
                <TextField
                    fullWidth
                    label="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                />
                <Button variant="contained" fullWidth onClick={login}>
                    Login
                </Button>
                <Button color="info">
                    <A href={Paths.REGISTER}>
                        Don't have an account yet? Register now
                    </A>
                </Button>
                <Button color="info">Forgot your password?</Button>
            </Box>
        </Container>
    );
};
