import {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
} from "react";
import Cookies from "js-cookie";
import { getMe, login } from "../services/api/auth"; 
import User from "../models/User";

const hasAuthToken = () => {
    return Cookies.get("token") !== undefined;
};

// Context Type
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<any>;
    isLoading: boolean;
}

// Context Create
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        if (!hasAuthToken()) {
            setIsLoading(false);
            return;
        }
        try {
            const response = await getMe();
            if (response?.data?.user) {
                setUser(response.data.user);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (email: string, password: string) => {
        const response = await login(email, password);
        if (response?.status === 200) {
            await fetchUser();
        }
        return response;
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login: handleLogin, isLoading }}>
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
