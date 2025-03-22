import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';
import CustomCard from '../../components/customCard/CustomCard';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Snackbar,
    Alert,
    InputAdornment,
    IconButton,
    useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { login } = UseAuth();
    const navigate = useNavigate();
    const theme = useTheme(); // Hook per accedere al tema

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            if (response.success) {
                navigate('/dashboard');
            } else {
                setError(response.message);
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Login error', error);
            setError('Unexpected error. Please try again.');
            setOpenSnackbar(true);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(to right, #E3F2FD, #90CAF9)'
                        : 'linear-gradient(to right, #1E1E1E, #424242)',
                transition: 'background 0.3s ease-in-out',
            }}
        >
            <Container maxWidth='sm'>
                <CustomCard hover={false}>
                    {/* Titolo */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography
                            variant='h4'
                            fontWeight='bold'
                            color={theme.palette.primary.dark}
                        >
                            Login
                        </Typography>
                        <Typography variant='body2' color={theme.palette.text.primary}>
                            Sign in to continue
                        </Typography>
                    </Box>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label='Email'
                            type='email'
                            variant='outlined'
                            margin='normal'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!error}
                        />
                        <TextField
                            fullWidth
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            variant='outlined'
                            margin='normal'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge='end'
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={!!error}
                        />

                        {/* Submit Button */}
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            type='submit'
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontSize: '1rem',
                                textTransform: 'none',
                                borderRadius: '8px',
                                transition: '0.3s',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Sign Up Redirect */}
                    <Typography
                        variant='body2'
                        sx={{ mt: 2, textAlign: 'center' }}
                        color={theme.palette.text.primary}
                    >
                        Don't have an account?{' '}
                        <Link
                            to='/register'
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.primary.dark,
                            }}
                        >
                            Sign Up
                        </Link>
                    </Typography>
                </CustomCard>
            </Container>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity='error'
                    sx={{
                        width: '100%',
                        backgroundColor: theme.palette.error.light,
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                    }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Login;
