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
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUser } from '../../services/api/user';

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

const Profile = () => {
    const { user } = UseAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // React Hook Form con valori predefiniti
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

    // Gestione del form
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
        <Container maxWidth='md'>
            <CustomCard hover={false} sx={{ p: 4 }}>
                {/* User Avatar */}
                <Avatar
                    sx={{
                        width: 80,
                        height: 80,
                        margin: '0 auto',
                        bgcolor: theme.palette.primary.dark,
                        fontSize: '2rem',
                    }}
                >
                    {user?.firstName?.charAt(0).toUpperCase()}
                </Avatar>

                {/* Titolo */}
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

                {/* Form Profilo */}
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label='First Name'
                        variant='outlined'
                        margin='normal'
                        {...register('firstName')}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        fullWidth
                        label='Last Name'
                        variant='outlined'
                        margin='normal'
                        {...register('lastName')}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                    <TextField
                        fullWidth
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
                        label='Phone'
                        variant='outlined'
                        margin='normal'
                        {...register('phone')}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                    <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent='space-around'
                        gap={4}
                        mt={4}
                    >
                        {/* Bottone Submit */}
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            sx={{
                                textTransform: 'none',
                                fontSize: '1rem',
                                py: 1.2,
                                borderRadius: 2,
                                transition: '0.3s',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                            type='submit'
                        >
                            Save Changes
                        </Button>

                        {/* Torna alla Dashboard */}
                        <Button
                            fullWidth
                            variant='outlined'
                            color='inherit'
                            sx={{
                                color: theme.palette.text.primary,
                                textTransform: 'none',
                                fontSize: '1rem',
                                py: 1.2,
                                borderRadius: 2,
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

            {/* Snackbar per Notifiche */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={error ? 'error' : 'success'}
                    sx={{
                        width: '100%',
                    }}
                >
                    {error || message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Profile;
