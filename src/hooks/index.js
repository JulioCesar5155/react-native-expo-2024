import { AuthProvider } from "./Auth";
import { FontProvider } from "./font";

export function AppProvider({ children }) {
    return <FontProvider>
        <AuthProvider>
        {children}
        </AuthProvider>
        </FontProvider>;
}