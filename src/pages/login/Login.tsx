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
    useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Layout configuration
const LAYOUT_CONFIG = {
    breakpoints: {
        mobile: '(max-width: 600px)',
    },
    snackbar: {
        duration: 4000,
        position: { vertical: 'top', horizontal: 'center' },
    },
    background: {
        light: 'linear-gradient(to right, #E3F2FD, #90CAF9)',
        dark: 'linear-gradient(to right, #1E1E1E, #424242)',
    },
} as const;

/**
 * Login component handles user authentication with email and password
 * Includes form validation, error handling, and responsive design
 */
const Login = () => {
    // State management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Hooks
    const { login } = UseAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(LAYOUT_CONFIG.breakpoints.mobile);

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
                        ? LAYOUT_CONFIG.background.light
                        : LAYOUT_CONFIG.background.dark,
                transition: 'background 0.3s ease-in-out',
            }}
        >
            <Container maxWidth='sm'>
                <CustomCard hover={false}>
                    {/* Header */}
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
                        {/* Email Field */}
                        <TextField
                            fullWidth
                            size={isMobile ? 'small' : 'medium'}
                            label='Email'
                            type='email'
                            variant='outlined'
                            margin='normal'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!error}
                        />

                        {/* Password Field */}
                        <TextField
                            fullWidth
                            size={isMobile ? 'small' : 'medium'}
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            variant='outlined'
                            margin='normal'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge='end'
                                                aria-label='toggle password visibility'
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            error={!!error}
                        />

                        {/* Submit Button */}
                        <Button
                            fullWidth
                            size={isMobile ? 'small' : 'medium'}
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

                    {/* Sign Up Link */}
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

            {/* Error Notification */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={LAYOUT_CONFIG.snackbar.duration}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={LAYOUT_CONFIG.snackbar.position}
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
