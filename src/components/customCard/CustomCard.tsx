import React, { ReactNode } from 'react';
import { Card, CardContent, useTheme, SxProps, Theme } from '@mui/material';

interface CustomCardProps {
    children: ReactNode;
    sx?: SxProps<Theme>;
}

const CustomCard = ({ children, sx }: CustomCardProps) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 3,
                maxWidth: 540,
                borderRadius: 4,
                boxShadow: 3,
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                backgroundColor: theme.palette.background.paper,
                transition: 'background-color 0.3s ease-in-out',
                ...sx,
            }}
        >
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default CustomCard;