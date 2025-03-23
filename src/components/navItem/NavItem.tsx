import { Stack, Tooltip, Typography, useTheme } from '@mui/material';
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
        text: {
            textAlign: 'start',
            width: '80%',
        },
    },
    tooltip: {
        placement: 'right' as const,
    },
} as const;

// Types
interface NavItemData {
    icon: React.ReactElement;
    text: string;
    path: string;
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
                    justifyContent: isExpanded ? 'space-between' : 'center',
                    color: theme.palette.text.primary,
                    backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }}
                role="button"
                tabIndex={0}
                aria-label={item.text}
                aria-current={isActive ? 'page' : undefined}
            >
                {item.icon}
                {isExpanded && (
                    <Typography 
                        sx={{ 
                            ...NAV_ITEM_CONFIG.styles.text,
                            color: theme.palette.text.primary 
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
