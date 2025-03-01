import { UseAuth } from "../../context/AuthContext";
import { Container, Typography, Button } from "@mui/material";

const Dashboard = () => {
    const { user } = UseAuth();

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4 }}>
                Benvenuto, {user?.firstName} {user?.lastName}!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Questa è la tua Dashboard personale.
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => console.log("Logout non implementato")}
            >
                Logout
            </Button>
        </Container>
    );
};

export default Dashboard;
