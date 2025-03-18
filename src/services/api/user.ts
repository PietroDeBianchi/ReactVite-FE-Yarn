import api from "../api";
import User from "../../types/User";
import ApiResponse from "../../types/ApiResponse";

// Definisci un tipo per i dati che vuoi aggiornare escludendo il campo _id e roles
export type UpdateUserData = Omit<User, '_id' | 'roles'> & { phone: string | null };

// Usa il tipo UpdateUserData come input, e restituisci una Promise<User>
export const updateUser = async (userId: string, userData: UpdateUserData) => {
    try {
        const response = await api.put<ApiResponse>(
            `/users/${userId}`,
            userData
        );
        return response.data;
    } catch (error: any) {
        console.error("Errore durante l'aggiornamento utente", error);
        throw error.response?.data || error;
    }
};
