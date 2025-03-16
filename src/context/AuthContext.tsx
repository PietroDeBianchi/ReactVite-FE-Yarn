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

const hasAuthToken = () => {
    const token = Cookies.get("token");
    return token && token.trim() !== "";
};

// Context Type
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    hasCookie: boolean;
    login: (email: string, password: string) => Promise<any>;
    logout: () => void;
}

// Context Create
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [hasCookie, setHasCookie] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchUser = async () => {
        if (!hasAuthToken()) {
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
            setUser(null);
            setHasCookie(false);
            Cookies.remove("token");
        } finally {
            setIsLoading(false);
        }
    };
    const handleLogin = async (email: string, password: string) => {
        const response = await login(email, password);
        if (response?.success) {
            await fetchUser();
        }
        return response;
    };
    const handleLogout = () => {
        Cookies.remove("token");
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
            "UseAuth deve essere utilizzato all'interno di un AuthProvider"
        );
    }
    return context;
};
