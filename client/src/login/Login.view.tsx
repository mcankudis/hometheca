import { A, useNavigate } from '@solidjs/router';
import { Box, Button, Container, TextField, Typography } from '@suid/material';
import { createSignal } from 'solid-js';

import { logo } from '@assets';
import { api } from '../api';
import { Paths } from '../paths';
import { userStore } from '../user/userStore';

export const LoginView = () => {
    const [username, setUsername] = createSignal('');
    const [password, setPassword] = createSignal('');
    const navigate = useNavigate();

    const login = async () => {
        const response = await api.user.login.mutate({
            username: username(),
            password: password()
        });

        // todo middleware to set user when store empty but cookie present
        userStore.setUser(response);
        console.log('LOGIN RESPONSE', response);

        if (response) {
            navigate(Paths.HOME, { replace: true });
        }
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
