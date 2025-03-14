import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Snackbar,
    Alert,
    Card,
    CardContent,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
    const { login } = UseAuth();
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            if (response.success) {
                navigate("/dashboard");
            } else {
                setError(response.message);
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Login error", error);
            setError("Unexpected error. Please try again.");
            setOpenSnackbar(true);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(to right,rgb(141, 218, 241),rgb(51, 98, 178))",
            }}
        >
            <Container maxWidth="sm">
                <Card
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 3,
                        backdropFilter: "blur(10px)",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                >
                    <CardContent>
                        {/* Title */}
                        <Box sx={{ textAlign: "center", mb: 3 }}>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                color="primary"
                            >
                                Login
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Sign in to continue
                            </Typography>
                        </Box>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                variant="outlined"
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Submit Button */}
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    fontSize: "1rem",
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "#2051f5",
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                        </form>

                        {/* Sign Up Redirect */}
                        <Typography
                            variant="body2"
                            sx={{ mt: 2, textAlign: "center" }}
                        >
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                style={{
                                    textDecoration: "none",
                                    color: "#1976d2",
                                }}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Login;
