import { Container, Typography, Box } from '@mui/material';
/**
 * NotFound page component
 * Displays a 404 error with a friendly message and navigation options
 */
const Simulations = () => {
    return (
        <Container maxWidth='lg'>
            <Box>
                {/* Title */}
                <Typography variant='h4' color='text.primary'>
                    Simulations
                </Typography>
            </Box>
        </Container>
    );
};

export default Simulations;
