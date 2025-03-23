import { UseAuth } from '../../context/AuthContext';
import CustomCard from '../../components/customCard/CustomCard';
import { Typography, TextField, Button, Grid2, Box, useMediaQuery, Stack } from '@mui/material';
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

// Layout configuration
const LAYOUT_CONFIG = {
    grid: {
        spacing: 3,
        container: {
            spacing: 3,
        },
    },
    charts: {
        height: 300,
        pieChart: {
            outerRadius: 80,
            cx: '50%',
            cy: '50%',
        },
    },
    responsive: {
        quickStats: {
            xs: 12,
            sm: 6,
            md: 3,
        },
        lineChart: {
            sm: 12,
            md: 8,
        },
        pieChart: {
            sm: 12,
            md: 4,
        },
        actions: {
            xs: 12,
            md: 6,
        },
    },
    breakpoints: {
        tablet: '(max-width: 1200px)',
        mobile: '(max-width: 600px)',
    },
} as const;

/**
 * Dashboard component displays user overview with statistics, charts,
 * and recent activity in a responsive grid layout
 */
const Dashboard = () => {
    const { user } = UseAuth();
    //const isMobile = useMediaQuery(LAYOUT_CONFIG.breakpoints.mobile);
    const isTablet = useMediaQuery(LAYOUT_CONFIG.breakpoints.tablet);
    return (
        <Grid2 container spacing={LAYOUT_CONFIG.grid.spacing}>
            {/* Welcome Section */}
            <Grid2 size={12}>
                <Typography variant='h4' fontWeight='bold' color='primary.main'>
                    Welcome, {user?.firstName}!
                </Typography>
                <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
                    This is your personal dashboard. From here, you can manage your account and
                    settings.
                </Typography>
            </Grid2>

            {/* Quick Stats Section */}
            <Grid2 container size={12} spacing={LAYOUT_CONFIG.grid.spacing}>
                {quickStats.map((stat, index) => (
                    <Grid2 key={index} size={LAYOUT_CONFIG.responsive.quickStats}>
                        <CustomCard>
                            <Stack direction='column' justifyContent='space-between' alignItems='center' height='100%'> 
                                <Typography variant={isTablet ? 'body1' : 'subtitle1'} gutterBottom>
                                    {stat.title}
                                </Typography>
                                <Typography variant={isTablet ? 'h5' : 'h4'} color='primary'>
                                    {stat.value}
                                </Typography>
                                <Typography variant='caption' color='text.secondary'>
                                    {stat.change}
                                </Typography>
                            </Stack>
                        </CustomCard>
                    </Grid2>
                ))}
            </Grid2>
            {/* Charts Section */}
            <Grid2 size={LAYOUT_CONFIG.responsive.lineChart} width={'100%'}>
                <CustomCard>
                    <Typography variant='h6' gutterBottom>
                        Monthly Trends
                    </Typography>
                    <Box sx={{ width: '100%', height: LAYOUT_CONFIG.charts.height }}>
                        <ResponsiveContainer>
                            <LineChart data={lineChartData}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip />
                                <Line type='monotone' dataKey='value' stroke='#8884d8' />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </CustomCard>
            </Grid2>

            <Grid2 size={LAYOUT_CONFIG.responsive.pieChart} width={'100%'}>
                <CustomCard>
                    <Typography variant='h6' gutterBottom>
                        Distribution
                    </Typography>
                    <ResponsiveContainer minHeight={LAYOUT_CONFIG.charts.height} width='100%'>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx={LAYOUT_CONFIG.charts.pieChart.cx}
                                cy={LAYOUT_CONFIG.charts.pieChart.cy}
                                labelLine={false}
                                outerRadius={LAYOUT_CONFIG.charts.pieChart.outerRadius}
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

            {/* Quick Actions Section */}
            <Grid2 size={LAYOUT_CONFIG.responsive.actions} sx={{ height: '100%' }}>
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

            {/* Recent Activity Section */}
            <Grid2 size={LAYOUT_CONFIG.responsive.actions} sx={{ display: 'flex' }}>
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
