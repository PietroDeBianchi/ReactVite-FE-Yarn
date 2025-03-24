import { Container, Typography, Box } from '@mui/material';
/**
 * NotFound page component
 * Displays a 404 error with a friendly message and navigation options
 */
const Analysis = () => {
    return (
        <Container maxWidth='lg'>
            <Box>
                {/* Title */}
                <Typography variant='h4' color='text.primary'>
                    Analysis
                </Typography>
            </Box>
        </Container>
    );
};

export default Analysis;
