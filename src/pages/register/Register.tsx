import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
} from "@mui/material";
import * as z from "zod";
import { register } from "../../services/api/auth";

// Zod * z
const registerSchema = z
    .object({
        firstName: z.string().min(1, "Il nome è obbligatorio"),
        lastName: z.string().min(1, "Il cognome è obbligatorio"),
        email: z.string().email("Inserisci un'email valida"),
        phone: z
            .string()
            .optional()
            .refine((val) => !val || /^\+?\d{7,15}$/.test(val), {
                message: "Numero di telefono non valido",
            }),
        password: z
            .string()
            .min(8, "La password deve avere almeno 8 caratteri"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Le password non coincidono",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await register({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone || null,
            });
            if (response.success) {
                navigate("/");
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error("Errore nella registrazione", error);
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
                    Registrati
                </Typography>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                >
                    <TextField
                        fullWidth
                        label="Nome"
                        variant="outlined"
                        margin="normal"
                        {...formRegister("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        fullWidth
                        label="Cognome"
                        variant="outlined"
                        margin="normal"
                        {...formRegister("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        {...formRegister("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        label="Telefono (opzionale)"
                        variant="outlined"
                        margin="normal"
                        {...formRegister("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        {...formRegister("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        fullWidth
                        label="Conferma Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        {...formRegister("confirmPassword")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Registrazione in corso..."
                            : "Registrati"}
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Hai già un account? <Link to="/login">Accedi</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;
