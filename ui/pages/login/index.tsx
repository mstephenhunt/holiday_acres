import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';


export default function LoginPage() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };


    const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
