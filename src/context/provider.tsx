"use client";

import { ReactNode } from "react";
import AuthContextProvider from "~/context/auth";
import ModalContextProvider from "~/context/modal";
import DrawerContextProvider from "~/context/drawer";
import ToastContextProvider from "./toast";
import Modal from "~/components/ui/modal";
import Drawer from "~/components/ui/drawer";
import { Toasts } from "~/components/ui/toast";

export default function AppContextProvider({ children }: { children: ReactNode }) {
    return <AuthContextProvider>
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
}