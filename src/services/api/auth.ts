import api from "../axios";

//REGISTER
export const register = async (userData: {email: string, password: string, firstName: string, lastName: string, phone: string | null}) => {
    try {
        await api.post(
            "/auth/register",
            userData,
        );
    } catch (error) {
        console.error("Errore di login", error);
    }
};

//LOGIN
export const login = async (email: string, password: string) => {
    try {
        const response = await api.post(
            "/auth/login",
            { email, password},
        );
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        return { success: false, message: "Errore di connessione al server" };
    }
};

//GETME
export const getMe = async () => {
    try {
        const data = await api.get("/auth/me");
        return data;
    } catch (error: any) {
        console.error("Errore nel recupero utente", error);
    }
};
