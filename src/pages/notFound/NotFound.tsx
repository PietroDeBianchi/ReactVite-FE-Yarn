import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";

// Configuration
const NOT_FOUND_CONFIG = {
    styles: {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            px: 2,
        },
        errorCode: {
            fontSize: { xs: '8rem', sm: '12rem' },
            fontWeight: 700,
            lineHeight: 1,
            background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
        },
        title: {
            fontSize: { xs: '1.5rem', sm: '2rem' },
            fontWeight: 500,
            mb: 2,
        },
        description: {
            fontSize: { xs: '1rem', sm: '1.2rem' },
            color: 'text.secondary',
            mb: 4,
            maxWidth: '600px',
        },
        button: {
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
        },
    },
    content: {
        title: '404',
        subtitle: 'Pagina non trovata',
        description: 'La pagina che stai cercando non esiste o è stata spostata.',
        buttonText: 'Torna alla Home',
    },
} as const;

/**
 * NotFound page component
 * Displays a 404 error with a friendly message and navigation options
 */
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Box sx={NOT_FOUND_CONFIG.styles.container}>
                {/* Error Code */}
                <Typography 
                    variant="h1" 
                    sx={NOT_FOUND_CONFIG.styles.errorCode}
                    aria-label="Error code 404"
                >
                    {NOT_FOUND_CONFIG.content.title}
                </Typography>

                {/* Title */}
                <Typography 
                    variant="h4" 
                    sx={NOT_FOUND_CONFIG.styles.title}
                    color="text.primary"
                >
                    {NOT_FOUND_CONFIG.content.subtitle}
                </Typography>

                {/* Description */}
                <Typography 
                    variant="body1" 
                    sx={NOT_FOUND_CONFIG.styles.description}
                >
                    {NOT_FOUND_CONFIG.content.description}
                </Typography>

                {/* Home Button */}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Home />}
                    onClick={() => navigate("/")}
                    sx={NOT_FOUND_CONFIG.styles.button}
                    aria-label="Return to home page"
                >
                    {NOT_FOUND_CONFIG.content.buttonText}
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;
