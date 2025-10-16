import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
    fullname: string,
    username: string,
    role: string,
    id: string
}
type AuthContextValue = {
    isLoggedIn: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_STORAGE_KEY = "auth_token";
const USER_STORAGE_KEY = "auth_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
            const storedUser = localStorage.getItem(USER_STORAGE_KEY);
            if (storedToken) {
                setToken(storedToken);
            }
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch {
            // ignore corrupted storage
        }
    }, []);

    const login = (user: User) => {
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(user));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        try {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            localStorage.removeItem(USER_STORAGE_KEY);
        } catch {
            // ignore
        }
    };

    const value = useMemo<AuthContextValue>(() => ({
        isLoggedIn: Boolean(token),
        token,
        user,
        login,
        logout,
    }), [token, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
};