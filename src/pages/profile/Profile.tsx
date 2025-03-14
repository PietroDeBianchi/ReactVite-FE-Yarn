import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    Avatar,
    Snackbar,
    Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "../../services/api/user";

// Validation schema using Zod
const profileSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z
        .string()
        .nullable()
        .refine((val) => !val || /^\+?\d{7,15}$/.test(val), {
            message: "Invalid phone number",
        }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
    const { user } = UseAuth(); // Extract setUser to update user state
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar

    // React Hook Form with default values from user data
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: user?.phone || null,
        },
    });

    // Handle form submission
    const onSubmit = async (data: ProfileFormData) => {
        try {
            if (!user?._id) return;
            const response = await updateUser(user._id, data);
            if (response.success) {
                setMessage(response.message);
                reset(data); // Reset form with updated data
            } else {
                setError(response.message);
            }
            setOpenSnackbar(true); // Show snackbar
        } catch (error) {
            console.error("Error updating profile", error);
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
                        textAlign: "center",
                        backdropFilter: "blur(10px)",
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                    }}
                >
                    <CardContent>
                        {/* User Avatar */}
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                margin: "0 auto",
                                bgcolor: "#6a11cb",
                                fontSize: "2rem",
                            }}
                        >
                            {user?.firstName?.charAt(0).toUpperCase()}
                        </Avatar>

                        {/* Title */}
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            User Profile
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Edit your personal details
                        </Typography>

                        {/* Profile Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            style={{ width: "100%" }}
                        >
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                                margin="normal"
                                {...register("firstName")}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                                margin="normal"
                                {...register("lastName")}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                variant="outlined"
                                margin="normal"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                fullWidth
                                label="Phone"
                                variant="outlined"
                                margin="normal"
                                {...register("phone")}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />

                            {/* Submit Button */}
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3 }}
                                type="submit"
                            >
                                Save Changes
                            </Button>

                            {/* Back to Dashboard */}
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={() => navigate("/dashboard")}
                            >
                                Back to Dashboard
                            </Button>
                        </form>
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

export default Profile;
