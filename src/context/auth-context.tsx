import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
    fullName: string,
    username: string,
    role: string,
    id: string
}
type AuthContextValue = {
    isLoggedIn: boolean;
    user: User | undefined;
    login: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_STORAGE_KEY = "auth_token";
const USER_STORAGE_KEY = "auth_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User>();
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        try {
            const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
            const storedUser = localStorage.getItem(USER_STORAGE_KEY);
            if (storedToken) {
                setToken(storedToken);
            }
            if (storedUser) {
                const tmp = JSON.parse(storedUser) as User;
                setUser(prev => prev = tmp);
                setLoggedIn(true)
            }
        } catch {
            // ignore corrupted storage
        }
    }, []);

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    };

    const logout = () => {
        setToken(null);
        setUser(undefined);
        setLoggedIn(false)
        try {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            localStorage.removeItem(USER_STORAGE_KEY);
        } catch {
            // ignore
        }
    };

    const value = useMemo<AuthContextValue>(() => ({
        isLoggedIn,
        token,
        user,
        login,
        logout,
    }), [token, user]);

    useEffect(() => {
        console.log(user)
        // setLoggedIn(prev => prev = (user ? true : false))
        console.log(isLoggedIn)
    }, [user])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
};