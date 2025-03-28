import api from "../api";
import ApiResponse from "../../types/ApiResponse";

//REGISTER
export const register = async (userData: {email: string, password: string, firstName: string, lastName: string, phone: string | null}) => {
    try {
        const response = await api.post<ApiResponse>(
            "/auth/register",
            userData,
        );
        return response.data;
    } catch (error: any) {
        console.error("Errore nella Registrazione", error);
        return error.response.data;
    }
};

//LOGIN
export const login = async (email: string, password: string) => {
    try {
        const response = await api.post<ApiResponse>(
            "/auth/login",
            { email, password },
        );
        return response.data;
    } catch (error: any) {
        console.error("Errore nella Login", error);
        return error.response.data;
    }
};

//GETME
export const getMe = async () => {
    try {
        const response = await api.get<ApiResponse>("/auth/me");
        return response.data;
    } catch (error: any) {
        console.error("Errore nel recupero utente", error);
        return error.response.data;
    }
};
