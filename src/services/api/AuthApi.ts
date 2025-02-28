import api from "../axios";
import User from "../../models/User";
import { LoginData, AuthResponse } from "../../models/Auth";

/**
 * Login save token in cookies HTTP-only.
 */
export const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

/**
 * Logout by reomving cookie token.
 */
export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
};

/**
 * Get User data if auth.
 * Token included in cookie.
 */
export const getMe = async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return response.data.user;
};
