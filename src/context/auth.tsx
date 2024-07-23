"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "~/types";
import { logout } from "~/data/users/login";

export type UserRole = "admin" | "doctor" | "secretary" | "readonly";

export type UserContext = {
    user: User | null,
    loginUser: (user: User) => void,
    logoutUser: () => void,
}

export const AuthContext = createContext<UserContext>({
    user: null,
    loginUser: () => { },
    logoutUser: () => { },
});

export default function AuthContextProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const path = usePathname();
    const [user, setUser] = useState<User | null>(null);

    function checkUserCreds() {
        if (user !== null)
            return true;

        const user_creds = localStorage.getItem("user_creds");
        if (!user_creds) return false;
        setUser(JSON.parse(user_creds) as User);
        return true;
    }

    // Get user credentials from local storage if they exist
    useEffect(() => {
        if (!checkUserCreds())
            router.push("/login?toast=error&msg=Usuario no definido");
    }, [path]);

    function loginUser(user: User) {
        localStorage.setItem("user_creds", JSON.stringify(user));
        setUser(user);
    }

    function logoutUser() {
        localStorage.removeItem("user_creds");
        setUser(null);
        logout();
        // router.push("/login");
    }

    return <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}