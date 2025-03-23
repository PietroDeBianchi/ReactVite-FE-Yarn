import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';
import CustomCard from '../../components/customCard/CustomCard';
import {
    Typography,
    TextField,
    Button,
    Avatar,
    Snackbar,
    Alert,
    useTheme,
    Stack,
    Chip,
    Container,
    useMediaQuery,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUser } from '../../services/api/user';

// Layout configuration
const LAYOUT_CONFIG = {
    breakpoints: {
        mobile: '(max-width: 600px)',
    },
    snackbar: {
        duration: 4000,
        position: { vertical: 'top', horizontal: 'center' },
    },
    avatar: {
        size: 80,
        fontSize: '2rem',
    },
    form: {
        button: {
            mobile: {
                fontSize: '0.70rem',
            },
            desktop: {
                fontSize: '1rem',
            },
            py: 1.2,
            borderRadius: 2,
        },
    },
} as const;

// Validation schema using Zod
const profileSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Enter a valid email'),
    phone: z
        .string()
        .nullable()
        .refine((val) => !val || /^\+?\d{7,15}$/.test(val), {
            message: 'Invalid phone number',
        }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

/**
 * Profile component handles user profile management with form validation
 * Includes avatar display, role indicator, and responsive design
 */
const Profile = () => {
    // Hooks
    const { user } = UseAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(LAYOUT_CONFIG.breakpoints.mobile);

    // State management
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || null,
        },
    });

    // Handle form submission
    const onSubmit = async (data: ProfileFormData) => {
        try {
            if (!user?._id) return;
            const response = await updateUser(user._id, data);
            if (response.success) {
                setMessage(response.message);
                reset(data);
            } else {
                setError(response.message);
            }
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error updating profile', error);
            setError('Unexpected error. Please try again.');
            setOpenSnackbar(true);
        }
    };

    return (
        <Container maxWidth='sm'>
            <CustomCard hover={false}>
                {/* User Avatar */}
                <Avatar
                    sx={{
                        width: LAYOUT_CONFIG.avatar.size,
                        height: LAYOUT_CONFIG.avatar.size,
                        margin: '0 auto',
                        bgcolor: theme.palette.primary.dark,
                        fontSize: LAYOUT_CONFIG.avatar.fontSize,
                    }}
                >
                    {user?.firstName?.charAt(0).toUpperCase()}
                </Avatar>

                {/* Header */}
                <Typography variant='h4' fontWeight='bold' color='primary' sx={{ mt: 2 }}>
                    User Profile
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    Edit your personal details
                </Typography>
                <Chip
                    label={user?.roles === 'admin' ? 'Admin' : 'User'}
                    color={user?.roles === 'admin' ? 'primary' : 'default'}
                    size='small'
                    sx={{ my: 2 }}
                />

                {/* Profile Form */}
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        size={isMobile ? 'small' : 'medium'}
                        label='First Name'
                        variant='outlined'
                        margin='normal'
                        {...register('firstName')}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        fullWidth
                        size={isMobile ? 'small' : 'medium'}
                        label='Last Name'
                        variant='outlined'
                        margin='normal'
                        {...register('lastName')}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                    <TextField
                        fullWidth
                        size={isMobile ? 'small' : 'medium'}
                        label='Email'
                        type='email'
                        variant='outlined'
                        margin='normal'
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        size={isMobile ? 'small' : 'medium'}
                        label='Phone'
                        variant='outlined'
                        margin='normal'
                        {...register('phone')}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />

                    {/* Action Buttons */}
                    <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent='space-around'
                        gap={4}
                        mt={4}
                    >
                        <Button
                            fullWidth
                            size={isMobile ? 'small' : 'medium'}
                            variant='contained'
                            color='primary'
                            sx={{
                                textTransform: 'none',
                                fontSize: isMobile 
                                    ? LAYOUT_CONFIG.form.button.mobile.fontSize 
                                    : LAYOUT_CONFIG.form.button.desktop.fontSize,
                                py: LAYOUT_CONFIG.form.button.py,
                                borderRadius: LAYOUT_CONFIG.form.button.borderRadius,
                                transition: '0.3s',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                            type='submit'
                        >
                            Save Changes
                        </Button>

                        <Button
                            fullWidth
                            size={isMobile ? 'small' : 'medium'}
                            variant='outlined'
                            color='inherit'
                            sx={{
                                color: theme.palette.text.primary,
                                textTransform: 'none',
                                fontSize: isMobile 
                                    ? LAYOUT_CONFIG.form.button.mobile.fontSize 
                                    : LAYOUT_CONFIG.form.button.desktop.fontSize,
                                py: LAYOUT_CONFIG.form.button.py,
                                borderRadius: LAYOUT_CONFIG.form.button.borderRadius,
                                transition: '0.3s',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark + '22',
                                },
                            }}
                            onClick={() => navigate('/dashboard')}
                        >
                            Back to Dashboard
                        </Button>
                    </Stack>
                </form>
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
    );
};

export default Profile;
