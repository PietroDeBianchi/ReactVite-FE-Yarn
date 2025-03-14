import { AppBar, Toolbar, Typography, IconButton, useTheme } from "@mui/material";
import { Menu, Brightness4, Brightness7 } from "@mui/icons-material";

interface TopbarProps {
    toggleTheme: () => void;
    darkMode: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ toggleTheme, darkMode }) => {
    const theme = useTheme(); // Ottieni il tema attuale

    return (
        <AppBar 
            position="sticky" 
            sx={{ background: theme.palette.background.default, color: theme.palette.text.primary }}
        >
            <Toolbar>
                {/* Menu Icon */}
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>

                {/* Titolo */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Admin Panel
                </Typography>

                {/* Switch Light/Dark Mode */}
                <IconButton onClick={toggleTheme} color="inherit">
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
