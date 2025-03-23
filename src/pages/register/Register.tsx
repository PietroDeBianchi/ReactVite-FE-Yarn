import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomCard from '../../components/customCard/CustomCard';
import {
    TextField,
    Button,
    Typography,
    Box,
    Snackbar,
    Alert,
    InputAdornment,
    IconButton,
    useTheme,
    Container,
    useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as z from 'zod';
import { register as registerUser } from '../../services/api/auth';

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
    container: {
        margin: {
            top: 12.5,
            bottom: 8,
            horizontal: 2,
        },
    },
} as const;

// Validation schema using Zod
const registerSchema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z.string().email('Enter a valid email'),
        phone: z
            .string()
            .optional()
            .refine((val) => !val || /^\+?\d{7,15}$/.test(val), {
                message: 'Invalid phone number',
            }),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Register component handles user registration with form validation
 * Includes password confirmation, phone number validation, and responsive design
 */
const Register = () => {
    // State management
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Hooks
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(LAYOUT_CONFIG.breakpoints.mobile);

    // React Hook Form setup
    const {
        register: formRegister,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    // Handle form submission
    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await registerUser({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone || null,
            });

            if (response.success) {
                setMessage('Registration successful! Redirecting...');
                setTimeout(() => navigate('/'), 2000);
            } else {
                setError(response.message);
            }
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error during registration', error);
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
            <Container
                maxWidth='sm'
                sx={{
                    mb: LAYOUT_CONFIG.container.margin.bottom,
                    mt: LAYOUT_CONFIG.container.margin.top,
                    mx: LAYOUT_CONFIG.container.margin.horizontal,
                }}
            >
                <CustomCard hover={false}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant='h4' fontWeight='bold' color='primary'>
                            Sign Up
                        </Typography>
                        <Typography variant='body2' color={theme.palette.text.primary}>
                            Create your account
                        </Typography>
                    </Box>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Personal Information Fields */}
                        <TextField
                            fullWidth
                            size={isMobile ? 'small' : 'medium'}
                            label='First Name'
                            variant='outlined'
                            margin='normal'
                            {...formRegister('firstName')}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                        <TextField
                            fullWidth
                            size={isMobile ? 'small' : 'medium'}
                            label='Last Name'
                            variant='outlined'
                            margin='normal'
                            {...formRegister('lastName')}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                        <TextField
                            fullWidth
                            label='Email'
                            size={isMobile ? 'small' : 'medium'}
                            type='email'
                            variant='outlined'
                            margin='normal'
                            {...formRegister('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            fullWidth
                            size={isMobile ? 'small' : 'medium'}
                            label='Phone (optional)'
                            variant='outlined'
                            margin='normal'
                            {...formRegister('phone')}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />

                        {/* Password Fields */}
                        <TextField
                            fullWidth
                            size={isMobile ? 'small' : 'medium'}
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            variant='outlined'
                            margin='normal'
                            {...formRegister('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
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
                        />

                        <TextField
                            fullWidth
                            size={isMobile ? 'small' : 'medium'}
                            label='Confirm Password'
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant='outlined'
                            margin='normal'
                            {...formRegister('confirmPassword')}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                                edge='end'
                                                aria-label='toggle confirm password visibility'
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
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
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registering...' : 'Sign Up'}
                        </Button>
                    </form>

                    {/* Login Link */}
                    <Typography
                        variant='body2'
                        sx={{ mt: 2, textAlign: 'center' }}
                        color='text.secondary'
                    >
                        Already have an account?{' '}
                        <Link
                            to='/'
                            style={{ textDecoration: 'none', color: theme.palette.primary.dark }}
                        >
                            Login
                        </Link>
                    </Typography>
                </CustomCard>

                {/* Notification Snackbar */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={LAYOUT_CONFIG.snackbar.duration}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={LAYOUT_CONFIG.snackbar.position}
                >
                    <Alert
                        onClose={() => setOpenSnackbar(false)}
                        severity={error ? 'error' : 'success'}
                        sx={{ width: '100%' }}
                    >
                        {error || message}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default Register;
