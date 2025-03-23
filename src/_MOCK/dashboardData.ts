// Types
interface ChartDataPoint {
    name: string;
    value: number;
}

interface QuickStat {
    title: string;
    value: string;
    change: string;
    trend: 'positive' | 'negative';
}

interface Activity {
    id: string;
    name: string;
    timestamp: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

// Configuration
const DASHBOARD_CONFIG = {
    colors: {
        primary: '#8884d8',    // Purple (matches LineChart stroke)
        secondary: '#82ca9d',  // Green
        tertiary: '#ffc658',   // Yellow
        success: '#4CAF50',    // Green
        warning: '#FFC107',    // Amber
        error: '#F44336',      // Red
    },
    dateFormat: 'YYYY-MM-DD HH:mm',
} as const;

// Monthly Revenue Chart Data
export const lineChartData: ChartDataPoint[] = [
    { name: 'Jan', value: 125 },
    { name: 'Feb', value: 142 },
    { name: 'Mar', value: 168 },
    { name: 'Apr', value: 189 },
    { name: 'May', value: 215 },
    { name: 'Jun', value: 248 },
];

// Sales by Product Category
export const barChartData: ChartDataPoint[] = [
    { name: 'Electronics', value: 450 },
    { name: 'Clothing', value: 320 },
    { name: 'Home Goods', value: 280 },
    { name: 'Books', value: 180 },
];

// Customer Demographics (percentages)
export const pieChartData: ChartDataPoint[] = [
    { name: 'Millennials', value: 45 },
    { name: 'Gen X', value: 30 },
    { name: 'Boomers', value: 15 },
    { name: 'Gen Z', value: 10 },
];

// Chart colors (matching the chart components)
export const COLORS = [
    DASHBOARD_CONFIG.colors.primary,
    DASHBOARD_CONFIG.colors.secondary,
    DASHBOARD_CONFIG.colors.tertiary,
    DASHBOARD_CONFIG.colors.success,
    DASHBOARD_CONFIG.colors.warning,
    DASHBOARD_CONFIG.colors.error,
];

// Quick stats data
export const quickStats: QuickStat[] = [
    {
        title: 'Total Revenue',
        value: '$1.48M',
        change: '+15.2% from last month',
        trend: 'positive',
    },
    {
        title: 'Active Customers',
        value: '12,847',
        change: '+8.5% from last month',
        trend: 'positive',
    },
    {
        title: 'Avg. Order Value',
        value: '$115.32',
        change: '+5.3% from last month',
        trend: 'positive',
    },
    {
        title: 'Churn Rate',
        value: '2.4%',
        change: '-0.8% from last month',
        trend: 'positive',
    },
];

// Recent activity data
export const recentActivity: Activity[] = [
    {
        id: '1',
        name: 'New customer acquisition campaign launched',
        timestamp: '2024-03-20 14:30',
        type: 'success',
    },
    {
        id: '2',
        name: 'Q1 sales target achieved',
        timestamp: '2024-03-20 13:15',
        type: 'success',
    },
    {
        id: '3',
        name: 'Inventory levels running low in Electronics category',
        timestamp: '2024-03-20 12:00',
        type: 'warning',
    },
    {
        id: '4',
        name: 'New product line launch scheduled for next week',
        timestamp: '2024-03-20 11:45',
        type: 'info',
    },
    {
        id: '5',
        name: 'Customer support response time above target',
        timestamp: '2024-03-20 10:30',
        type: 'warning',
    },
    {
        id: '6',
        name: 'Website performance optimization completed',
        timestamp: '2024-03-20 09:15',
        type: 'success',
    },
];

// Export types for use in other components
export type { ChartDataPoint, QuickStat, Activity };
