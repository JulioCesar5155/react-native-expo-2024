import { createContext, useEffect, useContext, useState } from "react";
import { useUserDatabase } from "../../database/useUserDatabase"
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { View, Text, ActivityIndicator } from "react-native";

const AuthContext = createContext({})

export const ROLE = {
    SUPER: "SUPER",
    ADM: "ADM",
    USER: "USER"
}

export function AuthProvider({children}) {
    const [user, setUser] = useState({
        autenticated: null,
        user: null,
        role: null
    });

    const { authUser } = useUserDatabase();

    useEffect(() => {
        const LoadStorageData = async () => {
        const userStorage = await AsyncStorage.getItem('@payment:user');
        
        if (userStorage) {
            setUser({
                autenticated: true,
                user: JSON.parse(userStorage),
                role: JSON.parse(userStorage).role,
            })
        }  else {
            setUser({
                autenticated: false,
                user: null,
                role: null,
            });
        };
    };
        LoadStorageData();
    }, []);


    const signIn = async ({email, password}) => {
        const response = await authUser({email, password});

        if (!response) {
            setUser({
                autenticated: false,
                user: null,
                role: null,
            });
            throw new Error("Falha ao logar");
        }

        await AsyncStorage.setItem('@payment:user', JSON.stringify(response));

        setUser({
            autenticated: true,
            user: response,
            role: response.role,
        });

        
    };

    const signOut = async () => {
        await AsyncStorage.removeItem('@payment:user');
        setUser({});
    };

    if (user?.autenticated === null) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
                <Text style={{fontSize: 28, marginTop: 15}}>
                    Carregando Dados do Usuário...
                </Text>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    return (
        <AuthContext.Provider value={{user, signIn, signOut}}>{children}</AuthContext.Provider>
    )
 
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;

}