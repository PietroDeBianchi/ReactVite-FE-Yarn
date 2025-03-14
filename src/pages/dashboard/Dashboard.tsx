import { UseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    Avatar,
    Chip,
    Stack,
} from "@mui/material";
import { Logout } from "@mui/icons-material";

const Dashboard = () => {
    const { user, logout } = UseAuth(); // Get logout function from context
    const navigate = useNavigate();

    // Handle user logout
    const handleLogout = () => {
        logout();
        navigate("/"); // Redirect to home or login page
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(to right, rgb(141, 218, 241), rgb(51, 98, 178))",
            }}
        >
            <Container maxWidth="sm">
                <Card
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 3,
                        textAlign: "center",
                        backdropFilter: "blur(10px)",
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                    }}
                >
                    <CardContent>
                        {/* User Avatar */}
                        <Avatar
                            sx={{
                                width: 90,
                                height: 90,
                                margin: "0 auto",
                                bgcolor:
                                    user?.roles === "admin"
                                        ? "#d32f2f"
                                        : "#6a11cb",
                                fontSize: "2rem",
                                position: "relative",
                            }}
                        >
                            {user?.firstName?.charAt(0).toUpperCase()}
                        </Avatar>

                        {/* Welcome Message */}
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Welcome, {user?.firstName}!
                        </Typography>

                        {/* User Role Chip */}
                        <Chip
                            label={user?.roles === "admin" ? "Admin" : "User"}
                            color={
                                user?.roles === "admin"
                                    ? "secondary"
                                    : "default"
                            }
                            sx={{ mt: 1 }}
                        />

                        {/* Description */}
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            This is your personal dashboard. From here, you can
                            manage your account and settings.
                        </Typography>

                        {/* Buttons Section */}
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ mt: 3 }}
                        >
                            {/* Profile Button */}
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    flex: 1,
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    py: 1.3,
                                    borderRadius: 2,
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "#2051f5",
                                    },
                                }}
                                onClick={() => navigate("/profile")}
                            >
                                Go to Profile
                            </Button>

                            {/* Logout Button */}
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{
                                    flex: 1,
                                    textTransform: "none",
                                    fontSize: "1rem",
                                    py: 1.3,
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1,
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "#ffebee",
                                    },
                                }}
                                onClick={handleLogout}
                            >
                                <Logout fontSize="small" />
                                Logout
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Dashboard;
