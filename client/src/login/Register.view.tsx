import { A } from '@solidjs/router';
import { Box, Button, Container, TextField, Typography } from '@suid/material';

import { logo } from '@assets';
import { Locale } from '@hometheca/shared';
import { createSignal } from 'solid-js';
import { api } from '../api';
import { Paths } from '../paths';

export const RegisterView = () => {
    const [username, setUsername] = createSignal('');
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');

    const register = async () => {
        const response = await api.user.createUser.mutate({
            username: username(),
            email: email(),
            password: password(),
            locale: Locale.EN
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
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                />
                <Button fullWidth onClick={register} variant="contained">
                    Register
                </Button>
                <Button color="info">
                    <A href={Paths.LOGIN}>
                        Already have an account? Login here!
                    </A>
                </Button>
            </Box>
        </Container>
    );
};
