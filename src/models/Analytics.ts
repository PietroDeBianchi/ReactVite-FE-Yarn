interface Analytics {
    url: string;
    ip?: string;
    location?: string;
    browser?: string;
    os?: string;
    deviceType?: string;
    referrer?: string;
    userAgent?: string;
}

export default Analytics;