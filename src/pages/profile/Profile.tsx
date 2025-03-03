import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    Avatar
} from "@mui/material";
import * as z from "zod";

// Schema di validazione con Zod
const profileSchema = z.object({
    firstName: z.string().min(1, "Il nome è obbligatorio"),
    lastName: z.string().min(1, "Il cognome è obbligatorio"),
    email: z.string().email("Inserisci un'email valida"),
    phone: z.string().optional().refine((val) => !val || /^\+?\d{7,15}$/.test(val), {
        message: "Numero di telefono non valido",
    }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
    const { user } = UseAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: user?.phone || "",
        },
    });

    const onSubmit = (data: ProfileFormData) => {
        console.log("Dati salvati:", data);
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
                            Profilo Utente
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Modifica i tuoi dati personali
                        </Typography>

                        {/* FORM */}
                        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                            <TextField
                                fullWidth
                                label="Nome"
                                variant="outlined"
                                margin="normal"
                                {...register("firstName")}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                            <TextField
                                fullWidth
                                label="Cognome"
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
                                label="Telefono"
                                variant="outlined"
                                margin="normal"
                                {...register("phone")}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />

                            {/* BOTTONI */}
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3 }}
                                type="submit"
                            >
                                Salva Modifiche
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={() => navigate("/dashboard")}
                            >
                                Torna alla Dashboard
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Profile;
