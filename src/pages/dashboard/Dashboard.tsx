import { UseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Card, CardContent, Avatar, Chip } from "@mui/material";

const Dashboard = () => {
    const { user } = UseAuth();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(to right,rgb(141, 218, 241),rgb(51, 98, 178))"
            }}
        >
            <Container maxWidth="sm">
                <Card
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 3,
                        textAlign: "center",
                        backdropFilter: "blur(10px)",
                        backgroundColor: "rgba(255, 255, 255, 0.85)"
                    }}
                >
                    <CardContent>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                margin: "0 auto",
                                bgcolor: "#6a11cb",
                                fontSize: "2rem"
                            }}
                        >
                            {user?.firstName?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mt: 2 }}>
                            Ciao, {user?.firstName}!
                        </Typography>
                        <Chip
                            label={user?.roles === "admin" ? "Admin" : "User"}
                            color={user?.roles === "admin" ? "secondary" : "default"}
                            sx={{ mt: 1 }}
                        />
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Benvenuto nella tua Dashboard personale. Da qui puoi gestire il tuo account e le tue impostazioni.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                            onClick={() => navigate("/profile")}
                        >
                            Vai al Profilo
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Dashboard;
