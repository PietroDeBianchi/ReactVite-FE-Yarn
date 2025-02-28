import { createContext, useContext, useEffect, useState, JSX } from "react";
import { getMe } from "../services/api/AuthApi";
import User from "../models/User";
import Cookies from "js-cookie";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginSuccess: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        // Fetch user if token exists in cookies
        const fetchUser = async () => {
            try {
                const userData = await getMe();
                if (isMounted) setUser(userData);
            } catch (error) {
                console.error("Error fetching user:", error);
                if (isMounted) setUser(null);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchUser();
        return () => {
            isMounted = false;
        };
    }, []);

    // Called after a successful login
    const loginSuccess = async () => {
        try {
            const userData = await getMe();
            setUser(userData);
        } catch (error) {
            console.error("Error after login:", error);
        }
    };

    // Logout function
    const logout = () => {
        Cookies.remove("token"); // Remove token from cookies
        setUser(null);
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginSuccess, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside an AuthProvider");
    return context;
};
