import { Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface NavItemData {
    icon: React.ReactElement;
    text: string;
    path: string;
}
interface CustomItemProps {
    item: NavItemData;
    isExpanded?: boolean;
    onClick: () => void;
}

const NavItem = ({ item, isExpanded, onClick }: CustomItemProps) => {
    const theme = useTheme();
    const { pathname } = useLocation();
    const isActive = pathname === item.path;

    return (
        <>
            <Tooltip
                disableHoverListener={isExpanded}
                title={!isExpanded ? item.text : ''}
                placement='right'
            >
                <Stack
                    onClick={onClick}
                    sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: isExpanded ? 'space-between' : 'center',
                        p: 1,
                        mx: 1,
                        my: 0.5,
                        gap: 1,  
                        borderRadius: 2,
                        color: theme.palette.text.primary,
                        backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                    }}
                >
                    {item.icon}
                    {isExpanded && (
                        <Typography sx={{ color: theme.palette.text.primary }} textAlign='start' width='80%'>
                            {item.text}
                        </Typography>
                    )}
                </Stack>
            </Tooltip>
        </>
    );
};

export default NavItem;
