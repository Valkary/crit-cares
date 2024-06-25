"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";
import Navbar from "~/components/ui/navbar";
import { AuthContext } from "~/context/auth";

export default function Layout({ children }: { children: ReactNode }) {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push("/login");
    }, []);

    return <>
        <Navbar user={user} />
        {children}
    </>
}