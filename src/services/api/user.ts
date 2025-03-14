import api from "../axios";

export const updateUser = async (userId: string, userData: {firstName: string, lastName: string, email: string, phone: string | null}) => {
    try {
        const response = await api.put(
            `/users/${userId}`,
            userData);
        return response.data;
    } catch (error: any) {
        console.error("Errore nella Registrazione", error);
        return error.response.data;
    }
};