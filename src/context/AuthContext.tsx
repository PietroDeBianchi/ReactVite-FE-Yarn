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

// Configuration
const AUTH_CONFIG = {
    storage: {
        tokenKey: "token",
    },
    default: {
        user: null as User | null,
        hasCookie: false,
        isLoading: true,
        isAuthenticating: false,
    },
} as const;

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
const tokenManager = {
    getToken: () => Cookies.get(AUTH_CONFIG.storage.tokenKey),
    setToken: (token: string) => Cookies.set(AUTH_CONFIG.storage.tokenKey, token),
    removeToken: () => Cookies.remove(AUTH_CONFIG.storage.tokenKey),
    hasToken: () => {
        const token = tokenManager.getToken();
        return token && token.trim() !== "";
    },
};

// Context Create
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component manages authentication state and provides auth-related functions
 * Handles user session, token management, and authentication status
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // State management
    const [user, setUser] = useState<User | null>(AUTH_CONFIG.default.user);
    const [hasCookie, setHasCookie] = useState<boolean>(AUTH_CONFIG.default.hasCookie);
    const [isLoading, setIsLoading] = useState<boolean>(AUTH_CONFIG.default.isLoading);
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(AUTH_CONFIG.default.isAuthenticating);

    /**
     * Fetches user data from the server
     * Updates authentication state based on response
     */
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

    /**
     * Handles user login process
     * @param email - User's email
     * @param password - User's password
     * @returns Promise with login response
     */
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

    /**
     * Handles user logout process
     * Clears authentication state and token
     */
    const handleLogout = () => {
        tokenManager.removeToken();
        setUser(null);
        setHasCookie(false);
    };

    // Initialize authentication state
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

/**
 * Custom hook for accessing authentication context
 * @throws Error if used outside of AuthProvider
 * @returns Authentication context
 */
export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("UseAuth must be used within an AuthProvider");
    }
    return context;
};
