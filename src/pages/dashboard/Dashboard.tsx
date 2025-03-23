import { UseAuth } from '../../context/AuthContext';
import CustomCard from '../../components/customCard/CustomCard';
import { Typography, TextField, Button, Grid2 } from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import {
    lineChartData,
    pieChartData,
    COLORS,
    quickStats,
    recentActivity,
} from '../../_MOCK/dashboardData';

const Dashboard = () => {
    const { user } = UseAuth();

    return (
        <Grid2 container spacing={3} sx={{ mt: 4 }}>
            {/* User Profile Section */}
            <Grid2 size={12}>
                <Typography variant='h4' fontWeight='bold' color='primary.main'>
                    Welcome, {user?.firstName}!
                </Typography>
                <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
                    This is your personal dashboard. From here, you can manage your account and
                    settings.
                </Typography>
            </Grid2>

            {/* Quick Stats */}
            {quickStats.map((stat, index) => (
                <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                    <CustomCard>
                        <Typography variant='h6' gutterBottom>
                            {stat.title}
                        </Typography>
                        <Typography variant='h4' color='primary'>
                            {stat.value}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {stat.change}
                        </Typography>
                    </CustomCard>
                </Grid2>
            ))}

            {/* Charts Section */}
            <Grid2 size={{ sm: 12, md: 8 }}>
                <CustomCard>
                    <Typography variant='h6' gutterBottom>
                        Monthly Trends
                    </Typography>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={lineChartData}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip />
                                <Line type='monotone' dataKey='value' stroke='#8884d8' />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CustomCard>
            </Grid2>

            <Grid2 size={{sm: 12, md: 4 }}>
                <CustomCard>
                    <Typography variant='h6' gutterBottom>
                        Distribution
                    </Typography>
                    <ResponsiveContainer minHeight={300}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx='50%'
                                cy='50%'
                                labelLine={false}
                                outerRadius={80}
                                fill='#8884d8'
                                dataKey='value'
                            >
                                {pieChartData.map((_entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CustomCard>
            </Grid2>

            {/* Input Section */}
            <Grid2 size={{ xs: 12, md: 6 }}>
                <CustomCard>
                    <Typography variant='h6' gutterBottom>
                        Quick Actions
                    </Typography>
                    <TextField fullWidth label='Search' variant='outlined' sx={{ mb: 2 }} />
                    <Button variant='contained' fullWidth>
                        Create New Project
                    </Button>
                </CustomCard>
            </Grid2>

            {/* Recent Activity */}
            <Grid2 size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
                <CustomCard sx={{ flexGrow: 1 }}>
                    <Typography variant='h6' gutterBottom>
                        Recent Activity
                    </Typography>
                    {recentActivity.length > 0 ? (
                        recentActivity.map((activity, index) => (
                            <Typography key={index} variant='body1' color='text.secondary'>
                                {activity.name}
                            </Typography>
                        ))
                    ) : (
                        <Typography variant='body2' color='text.secondary'>
                            No recent activity to display
                        </Typography>
                    )}
                </CustomCard>
            </Grid2>
        </Grid2>
    );
};

export default Dashboard;
