import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from "react";
import { fetcher, RequestType } from "../../src/fetcher";


type UserCredentials = {
    username: string;
    password: string;
}

export default function LoginPage() {

    const [userCredentials, setUserCredentials] = useState<UserCredentials>();

    useEffect(() => {
        if (!userCredentials) {
            setUserCredentials({username: "", password: ""});
        }
    });


    const handleUsernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({username: event.target.value, password: userCredentials.password})
    }

    const handlePasswordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({username:  userCredentials.username, password: event.target.value})
    }


    const handleLogin = async () => {
        const response = await fetcher({
            path: "/api/users/login",
            method: RequestType.POST,
            body: {email: userCredentials.username, password: userCredentials.password},
            requestHeaders: [{
                headerKey: 'content-type',
                headerValue: 'application/json'
            }]
        })
        const jsonResponse = await response.json()
        const token = jsonResponse.token
        document.cookie = "token="+token
        console.log(document.cookie.substring(82, document.cookie.length))

    }
    return (
        <Container component="main" maxWidth="xs">
            <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
            >
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleUsernameChanged}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChanged}
                />
            </Box>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => { handleLogin(); }}
            >
            Sign In
            </Button>
            <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
            >
            </Box>
        </Container>
    )
}
