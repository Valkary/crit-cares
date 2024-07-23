"use client";

import { ReactNode } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import AuthContextProvider from "~/context/auth";
import ModalContextProvider from "~/context/modal";
import DrawerContextProvider from "~/context/drawer";
import Modal from "~/components/ui/modal";
import Drawer from "~/components/ui/drawer";
import { ThemeProvider } from "./theme";
import { Toaster } from "~/components/ui/toaster";

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
                    <DrawerContextProvider>
                        <Modal />
                        <Drawer />
                        {children}
                        <Toaster />
                    </DrawerContextProvider>
                </ModalContextProvider>
            </AuthContextProvider>
        </ThemeProvider>
    </QueryClientProvider>
}