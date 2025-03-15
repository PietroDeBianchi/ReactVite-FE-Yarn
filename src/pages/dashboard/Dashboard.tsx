import { UseAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Card, CardContent, Avatar, Chip, Stack, useTheme } from '@mui/material';
import { Logout } from '@mui/icons-material';

const Dashboard = () => {
    const { user, logout } = UseAuth();
    const navigate = useNavigate();
    const theme = useTheme(); // Hook per usare il tema

    // Handle user logout
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Card
            sx={{
                p: 4,
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
                        width: 90,
                        height: 90,
                        margin: '0 auto',
                        bgcolor: theme.palette.primary.dark,
                        fontSize: '2rem',
                    }}
                >
                    {user?.firstName?.charAt(0).toUpperCase()}
                </Avatar>

                {/* Welcome Message */}
                <Typography variant='h4' fontWeight='bold' color='primary' sx={{ mt: 2 }}>
                    Welcome, {user?.firstName}!
                </Typography>

                {/* User Role Chip */}
                <Chip label={user?.roles === 'admin' ? 'Admin' : 'User'} color={user?.roles === 'admin' ? 'primary' : 'default'} sx={{ mt: 1 }} />

                {/* Description */}
                <Typography variant='body1' color='text.secondary' sx={{ mt: 2 }}>
                    This is your personal dashboard. From here, you can manage your account and settings.
                </Typography>

                {/* Buttons Section */}
                <Stack direction='row' justifyContent='center' spacing={2} sx={{ mt: 3 }}>
                    {/* Profile Button */}
                    <Button
                        variant='contained'
                        color='inherit'
                        sx={{
                            color: theme.palette.text.primary,
                            flex: 0.2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            py: 1.3,
                            borderRadius: 2,
                            transition: '0.3s',
                            '&:hover': {
                                color: theme.palette.text.primary,
                            },
                        }}
                        onClick={() => navigate('/profile')}
                    >
                        Go to Profile
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Dashboard;
