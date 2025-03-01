import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = UseAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            if (response.success) {
                navigate("/dashboard");
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error("Errore nel login", error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
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
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Non hai un account? <Link to="/register">Registrati</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
