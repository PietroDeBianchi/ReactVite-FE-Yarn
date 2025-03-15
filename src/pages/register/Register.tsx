import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Snackbar,
    Alert,
    Card,
    CardContent,
    InputAdornment,
    IconButton,
    useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as z from 'zod';
import { register as registerUser } from '../../services/api/auth';

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

const Register = () => {
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const navigate = useNavigate();
    const theme = useTheme(); // Hook per usare il tema

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
                    theme.palette.mode === 'light' ? 'linear-gradient(to right, #E3F2FD, #90CAF9)' : 'linear-gradient(to right, #1E1E1E, #424242)',
                transition: 'background 0.3s ease-in-out',
            }}
        >
            <Container maxWidth='sm'>
                <Card
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 3,
                        backdropFilter: 'blur(10px)',
                        backgroundColor: theme.palette.background.paper,
                        transition: 'background-color 0.3s ease-in-out',
                    }}
                >
                    <CardContent>
                        {/* Titolo */}
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Typography variant='h4' fontWeight='bold' color='primary'>
                                Sign Up
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                Create your account
                            </Typography>
                        </Box>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                            <TextField
                                fullWidth
                                label='First Name'
                                variant='outlined'
                                margin='normal'
                                {...formRegister('firstName')}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                            <TextField
                                fullWidth
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
                                type='email'
                                variant='outlined'
                                margin='normal'
                                {...formRegister('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                fullWidth
                                label='Phone (optional)'
                                variant='outlined'
                                margin='normal'
                                {...formRegister('phone')}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />

                            {/* Password */}
                            <TextField
                                fullWidth
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                                variant='outlined'
                                margin='normal'
                                {...formRegister('password')}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Conferma Password */}
                            <TextField
                                fullWidth
                                label='Confirm Password'
                                type={showConfirmPassword ? 'text' : 'password'}
                                variant='outlined'
                                margin='normal'
                                {...formRegister('confirmPassword')}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge='end'>
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Bottone Register */}
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
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Registering...' : 'Sign Up'}
                            </Button>
                        </form>

                        {/* Login Redirect */}
                        <Typography variant='body2' sx={{ mt: 2, textAlign: 'center' }} color='text.secondary'>
                            Already have an account?{' '}
                            <Link to='/' style={{ textDecoration: 'none', color: theme.palette.secondary.dark }}>
                                Login
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
            {/* Snackbar for Notifications */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {error || message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Register;
