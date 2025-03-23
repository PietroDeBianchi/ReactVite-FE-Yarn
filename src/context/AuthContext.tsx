import {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
} from "react";
import Cookies from "js-cookie";
import { getMe, login } from "../services/api/auth";
import User from "../types/User";
import ApiResponse from "../types/ApiResponse";

// Types
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticating: boolean;
    hasCookie: boolean;
    login: (email: string, password: string) => Promise<ApiResponse>;
    logout: () => void;
}

// Token Management
const TOKEN_KEY = "token";

const tokenManager = {
    getToken: () => Cookies.get(TOKEN_KEY),
    setToken: (token: string) => Cookies.set(TOKEN_KEY, token),
    removeToken: () => Cookies.remove(TOKEN_KEY),
    hasToken: () => {
        const token = tokenManager.getToken();
        return token && token.trim() !== "";
    },
};

// Context Create
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [hasCookie, setHasCookie] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    console.log('LOOP');
    
    const fetchUser = async () => {
        if (!tokenManager.hasToken()) {
            setIsLoading(false);
            return;
        }
        try {
            const response = await getMe();
            if (response?.data) {
                setUser(response.data);
                setHasCookie(true);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Authentication error:", error.message);
            }
            setUser(null);
            setHasCookie(false);
            tokenManager.removeToken();
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (email: string, password: string): Promise<ApiResponse> => {
        setIsAuthenticating(true);
        try {
            const response = await login(email, password);
            if (response?.success) {
                await fetchUser();
            }
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
            return { success: false, message: errorMessage, data: null };
        } finally {
            setIsAuthenticating(false);
        }
    };

    const handleLogout = () => {
        tokenManager.removeToken();
        setUser(null);
        setHasCookie(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticating,
                hasCookie,
                login: handleLogin,
                logout: handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook for AuthContext
export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "UseAuth must be used within an AuthProvider"
        );
    }
    return context;
};
