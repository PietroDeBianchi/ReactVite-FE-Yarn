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
    Card,
    CardContent,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as z from "zod";
import { register } from "../../services/api/auth";

// Schema di validazione con Zod
const registerSchema = z
    .object({
        firstName: z.string().min(1, "Il nome è obbligatorio"),
        lastName: z.string().min(1, "Il cognome è obbligatorio"),
        email: z.string().email("Inserisci un'email valida"),
        phone: z.string().optional().refine((val) => !val || /^\+?\d{7,15}$/.test(val), {
            message: "Numero di telefono non valido",
        }),
        password: z.string().min(8, "La password deve avere almeno 8 caratteri"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Le password non coincidono",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            setError("Errore imprevisto. Riprova.");
        }
    };

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
                        backdropFilter: "blur(10px)",
                        backgroundColor: "rgba(255, 255, 255, 0.85)"
                    }}
                >
                    <CardContent>
                        <Box sx={{ textAlign: "center", mb: 3 }}>
                            <Typography variant="h4" fontWeight="bold" color="primary">
                                Registrati
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Crea il tuo account
                            </Typography>
                        </Box>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                margin="normal"
                                {...formRegister("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Conferma Password"
                                type={showConfirmPassword ? "text" : "password"}
                                variant="outlined"
                                margin="normal"
                                {...formRegister("confirmPassword")}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
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
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    fontSize: "1rem",
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "#2051f5"
                                    }
                                }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Registrazione in corso..." : "Registrati"}
                            </Button>
                        </form>
                        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                            Hai già un account?{" "}
                            <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                                Accedi
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Register;
