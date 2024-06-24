"use client";
import { ReactNode, createContext, useState } from "react";
import jwt from "jwt-client";

export type UserRole = "admin" | "doctor" | "secretary" | "readonly";

export type User = {
    email: string,
    names: string,
    last_names: string,
    role: UserRole,
    phone: string,
    token: string,
}

export type UserContext = {
    user: User | null,
    loginUser: (token: string) => void
}

export const AuthContext = createContext<UserContext>({
    user: null,
    loginUser: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    
    function loginUser(token: string) {
        const tmp_user = jwt.read(token).claim as User;

        setUser({
            ...tmp_user,
            token,
        });
    }

    console.log(user);

    return <AuthContext.Provider value={{ user, loginUser }}>
        {children}
    </AuthContext.Provider>
}