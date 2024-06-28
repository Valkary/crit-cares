"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import jwt from "jwt-client";
import { useRouter } from "next/navigation";

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
    loginUser: (token: string) => void,
    logoutUser: () => void,
}

export const AuthContext = createContext<UserContext>({
    user: null,
    loginUser: () => { },
    logoutUser: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    // Get user credentials from local storage if they exist
    useEffect(() => {
        const user_creds = localStorage.getItem("user_creds");

        if (!user_creds) {
            router.push("/login")
            return;
        }
        
        setUser(JSON.parse(user_creds) as User);
        router.push("/logged/dashboard");
    }, []);

    function loginUser(token: string) {
        const tmp_user = jwt.read(token).claim as User;
        const credentials = {
            ...tmp_user,
            token,
        }

        localStorage.setItem("user_creds", JSON.stringify(credentials));
        setUser(credentials);
    }

    function logoutUser() {
        localStorage.removeItem("user_creds");
        setUser(null);
        router.push("/login");
    }

    return <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}