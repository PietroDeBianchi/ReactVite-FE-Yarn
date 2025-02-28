import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { login } from "../../services/api/AuthApi";
import { UseAuth } from "../../context/AuthContext";

const loginSchema = z.object({
    email: z.string().email("Email non valida"),
    password: z.string().min(6, "La password deve avere almeno 6 caratteri"),
});

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const { loginSuccess } = UseAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const response = await login(data);
            // Save token in secure httpOnly cookie
            Cookies.set("token", response.token, { secure: true, sameSite: "Strict" });
            await loginSuccess();
            navigate("/dashboard");
        } catch (error) {
            alert("Credenziali non valide");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
                <Typography variant="h5" align="center">Login</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("email")}
                        label="Email"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        {...register("password")}
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? "Caricamento..." : "Login"}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
