import { AuthProvider } from "./Auth";
import { FontProvider } from "./font";
import { DataProvider } from "./Data";

export function AppProvider({ children }) {
    return (
    <FontProvider>
        <DataProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </DataProvider>
    </FontProvider>
);
}