import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{ textAlign: "center", mt: 8 }}>
            <Typography variant="h2" color="error">
                404
            </Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>
                Pagina non trovata
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 4 }}
                onClick={() => navigate("/")}
            >
                Torna alla Home
            </Button>
        </Container>
    );
};

export default NotFound;
