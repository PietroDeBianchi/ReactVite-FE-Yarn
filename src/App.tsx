import AppRouter from "./router/router";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}

export default App;
