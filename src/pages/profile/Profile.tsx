import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';
import { Typography, TextField, Button, Box, Card, CardContent, Avatar, Snackbar, Alert, useTheme } from '@mui/material';
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
    const theme = useTheme(); // Hook per usare il tema

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
        <>
            <Card
                sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 3,
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <CardContent>
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
                    <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
                        Edit your personal details
                    </Typography>

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

                        {/* Bottone Submit */}
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            sx={{
                                mt: 3,
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
                            color='primary'
                            sx={{
                                mt: 2,
                                textTransform: 'none',
                                fontSize: '1rem',
                                py: 1.2,
                                borderRadius: 2,
                                transition: '0.3s',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light + '22',
                                },
                            }}
                            onClick={() => navigate('/dashboard')}
                        >
                            Back to Dashboard
                        </Button>
                    </form>
                </CardContent>
            </Card>

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
                        backgroundColor: error ? theme.palette.error.light : theme.palette.success.light,
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                    }}
                >
                    {error || message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Profile;
