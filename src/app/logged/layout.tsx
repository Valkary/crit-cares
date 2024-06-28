"use server";
import { ReactNode } from "react";
import Navbar from "~/components/ui/navbar";

export default async function Layout({ children }: { children: ReactNode }) {
    return <main className="min-h-screen w-screen overflow-hidden bg-slate-200">
        <Navbar />
        {children}
    </main>
}