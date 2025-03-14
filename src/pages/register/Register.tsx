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
    Snackbar,
    Alert,
    Card,
    CardContent,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as z from "zod";
import { register as registerUser } from "../../services/api/auth";

// Validation schema using Zod
const registerSchema = z
    .object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Enter a valid email"),
        phone: z
            .string()
            .optional()
            .refine((val) => !val || /^\+?\d{7,15}$/.test(val), {
                message: "Invalid phone number",
            }),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
    const navigate = useNavigate();

    // React Hook Form setup
    const {
        register: formRegister,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    // Handle form submission
    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await registerUser({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone || null,
            });

            if (response.success) {
                setMessage("Registration successful! Redirecting...");
                setTimeout(() => navigate("/"), 2000); // Redirect after 2s
            } else {
                setError(response.message);
            }
            setOpenSnackbar(true); // Show snackbar
        } catch (error) {
            console.error("Error during registration", error);
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
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
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
                                Sign Up
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Create your account
                            </Typography>
                        </Box>

                        {/* Registration Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            style={{ width: "100%" }}
                        >
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                margin="normal"
                                {...formRegister("firstName")}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
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
                                label="Phone (optional)"
                                variant="outlined"
                                margin="normal"
                                {...formRegister("phone")}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />

                            {/* Password Field */}
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

                            {/* Confirm Password Field */}
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                variant="outlined"
                                margin="normal"
                                {...formRegister("confirmPassword")}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {showConfirmPassword ? (
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
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Registering..." : "Sign Up"}
                            </Button>
                        </form>

                        {/* Login Redirect */}
                        <Typography
                            variant="body2"
                            sx={{ mt: 2, textAlign: "center" }}
                        >
                            Already have an account?{" "}
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "#1976d2",
                                }}
                            >
                                Login
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
                    severity={error ? "error" : "success"}
                    sx={{ width: "100%" }}
                >
                    {error || message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Register;
