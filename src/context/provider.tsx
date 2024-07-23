"use client";

import { ReactNode } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import AuthContextProvider from "~/context/auth";
import ModalContextProvider from "~/context/modal";
import DrawerContextProvider from "~/context/drawer";
import ToastContextProvider from "./toast";
import Modal from "~/components/ui/modal";
import Drawer from "~/components/ui/drawer";
import { Toasts } from "~/components/ui/toast";

const queryClient = new QueryClient();

export default function AppContextProvider({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <ModalContextProvider>
                <DrawerContextProvider>
                    <ToastContextProvider>
                        <Modal />
                        <Drawer />
                        <Toasts />
                        {children}
                    </ToastContextProvider>
                </DrawerContextProvider>
            </ModalContextProvider>
        </AuthContextProvider>
    </QueryClientProvider> 
}