import { ReactNode } from 'react';
import { Card, CardContent, useTheme, SxProps, Theme, useMediaQuery } from '@mui/material';

// Configuration
const CARD_CONFIG = {
    styles: {
        base: {
            maxWidth: '100%',

            borderRadius: 4,
            boxShadow: 3,
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease',
        },
        hover: {
            '&:hover': {
                boxShadow: 8,
                transform: 'translateY(-5px) scale(1.01)',
            },
        },
        mobile: {
            p: 0,
        },
        desktop: {
            p: 2,
        },
    },
    breakpoints: {
        mobile: '(max-width: 600px)',
    },
} as const;

// Types
interface CustomCardProps {
    children: ReactNode;
    sx?: SxProps<Theme>;
    hover?: boolean;
}

/**
 * CustomCard component
 * A reusable card component with hover effects and responsive padding
 * @param {CustomCardProps} props - Component props
 * @param {ReactNode} props.children - Card content
 * @param {SxProps<Theme>} [props.sx] - Additional styles
 * @param {boolean} [props.hover=true] - Enable/disable hover effects
 */
const CustomCard = ({ children, sx, hover = true }: CustomCardProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(CARD_CONFIG.breakpoints.mobile);

    return (
        <Card
            sx={{
                ...CARD_CONFIG.styles.base,
                backgroundColor: theme.palette.background.paper,
                ...(hover && CARD_CONFIG.styles.hover),
                ...(isMobile ? CARD_CONFIG.styles.mobile : CARD_CONFIG.styles.desktop),
                ...sx,
            }}
        >
            <CardContent sx={{ paddingBottom: 0, height: '80%' }}>{children}</CardContent>
        </Card>
    );
};

export default CustomCard;