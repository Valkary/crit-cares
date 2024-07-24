"use client";
import { ReactNode } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import AuthContextProvider from "~/context/auth";
import { ThemeProvider } from "./theme";
import { Toaster } from "~/components/ui/toaster";
import ModalContextProvider from "./modal";
import Modal from "~/components/ui/modal";

const queryClient = new QueryClient();

export default function AppContextProvider({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <AuthContextProvider>
                <ModalContextProvider>
                    <Modal />
                    {children}
                </ModalContextProvider>
                <Toaster />
            </AuthContextProvider>
        </ThemeProvider>
    </QueryClientProvider>
}