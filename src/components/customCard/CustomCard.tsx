import { ReactNode } from 'react';
import { Card, CardContent, useTheme, SxProps, Theme } from '@mui/material';

interface CustomCardProps {
    children: ReactNode;
    sx?: SxProps<Theme>;
    hover?: boolean;
}

const CustomCard = ({ children, sx, hover = true }: CustomCardProps) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 2,
                maxWidth: '100%',
                borderRadius: 4,
                boxShadow: 3,
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                backgroundColor: theme.palette.background.paper,
                transition: 'transform 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease',
                ...(hover && {
                    '&:hover': {
                        boxShadow: 8,
                        transform: 'translateY(-5px) scale(1.01)',
                    },
                }),
                ...sx,
            }}
        >
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default CustomCard;