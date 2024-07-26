"use server";
import Link from "next/link"
import {
    BrainIcon,
    FileIcon,
    Menu,
    StethoscopeIcon,
    UsersIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReactNode } from "react";
import UserDropdownMenu from "./user_dropdown_menu";
import { redirect } from "next/navigation";
import { get_user_creds } from "~/data/users/login";
import Sidebar from "./sidebar";
import Header from "./header";

export type Route = {
    title: string,
    url: string,
    icon: ReactNode
}

const routes: Route[] = [
    {
        title: "Pacientes",
        url: "/logged/patients",
        icon: <UsersIcon className="h-4 w-4" />
    },
    {
        title: "Documentos",
        url: "/logged/documents",
        icon: <FileIcon className="h-4 w-4" />
    },
    {
        title: "Equipo Médico",
        url: "/logged/equipment",
        icon: <StethoscopeIcon className="h-4 w-4" />
    },
]

export default async function Layout({ children }: { children: ReactNode }) {
    const user_creds = await get_user_creds();

    if (!user_creds.success)
        return redirect("/login?toast=error&msg=Usuario no definido");

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar routes={routes} />
            <div className="flex flex-col">
                <Header routes={routes} user={user_creds.user} />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full max-w-full overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}
