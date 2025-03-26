import { Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

// Configuration
const NAV_ITEM_CONFIG = {
    styles: {
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            p: 1,
            mx: 1,
            my: 0.5,
            gap: 1,
            borderRadius: 2,
            transition: 'background-color 0.2s ease',
        },
    },
    tooltip: {
        placement: 'right' as const,
    },
} as const;

// Types
interface NavItemData {
    text: string;
    path: string;
    icon?: React.ReactElement;
    element: React.ReactElement | null;
    isNav?: boolean;
    isLogout?: boolean;
}

interface NavItemProps {
    item: NavItemData;
    isExpanded?: boolean;
    onClick: () => void;
}

/**
 * NavItem component
 * A navigation item with icon, text, and hover effects
 * @param {NavItemProps} props - Component props
 * @param {NavItemData} props.item - Navigation item data
 * @param {boolean} [props.isExpanded] - Whether the navigation is expanded
 * @param {() => void} props.onClick - Click handler
 */
const NavItem = ({ item, isExpanded, onClick }: NavItemProps) => {
    const theme = useTheme();
    const { pathname } = useLocation();
    const isActive = pathname === item.path;
    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <Tooltip
            disableHoverListener={isExpanded}
            title={!isExpanded ? item.text : ''}
            placement={NAV_ITEM_CONFIG.tooltip.placement}
        >
            <Stack
                onClick={onClick}
                sx={{
                    ...NAV_ITEM_CONFIG.styles.container,
                    justifyContent: isExpanded ? 'start' : 'center',
                    color: theme.palette.text.primary,
                    backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
                    '&:hover': {
                        backgroundColor: !item.isLogout ? theme.palette.action.hover : 'transparent',
                    },
                }}
                role='button'
                tabIndex={0}
                aria-label={item.text}
                aria-current={isActive ? 'page' : undefined}
            >
                {item.icon && item.icon}
                {(isMobile || isExpanded) && (
                    <Typography
                        textAlign={'start'}
                        sx={{
                            color: !item.isLogout
                                ? theme.palette.text.primary
                                : theme.palette.error.main,
                            width: isMobile ? '100%' : 'auto',
                        }}
                    >
                        {item.text}
                    </Typography>
                )}
            </Stack>
        </Tooltip>
    );
};

export default NavItem;
