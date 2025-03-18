import { UseAuth } from '../../context/AuthContext';
import CustomCard from '../../components/customCard/CustomCard';
import { Typography, Avatar, Chip, useTheme } from '@mui/material';

const Dashboard = () => {
    const { user } = UseAuth();
    const theme = useTheme(); // Hook per usare il tema

    return (
        <CustomCard>
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
            <Chip
                label={user?.roles === 'admin' ? 'Admin' : 'User'}
                color={user?.roles === 'admin' ? 'primary' : 'default'}
                sx={{ mt: 1 }}
            />

            {/* Description */}
            <Typography variant='body1' color='text.secondary' sx={{ mt: 2 }}>
                This is your personal dashboard. From here, you can manage your account and
                settings.
            </Typography>
        </CustomCard>
    );
};

export default Dashboard;
