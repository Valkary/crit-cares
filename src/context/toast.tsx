"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export type ToastStatus = "warning" | "error" | "info" | "success";

export type ToastType = {
    id: number,
    type: ToastStatus,
    message?: string,
    duration?: number
}

type ToastContextType = {
    toasts: ToastType[],
    addToast: (type: ToastStatus, message?: string, duration?: number) => void,
    deleteToast: (id: number) => void,
}

const ToastContext = createContext<ToastContextType>({
    toasts: [],
    addToast: () => { },
    deleteToast: () => { }
});

export default function ToastContextProvider({ children }: { children: ReactNode }) {
    const path = usePathname();
    const params = useSearchParams();
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const deleteToast = useCallback((id: number) => {
        setToasts(prevToasts => prevToasts.filter(t => t.id !== id));
    }, []);

    function addToast(type: ToastStatus, message?: string, duration?: number) {
        const toast: ToastType = {
            id: (new Date()).getTime(),
            type,
            message,
            duration
        }

        setToasts(t => [...t, toast]);
    }

    useEffect(() => {
        const status = params.get('toast') as ToastStatus;

        if (status) {
            addToast(status, params.get('msg') ?? '');
        }
    }, [path]);

    return <ToastContext.Provider value={{
        toasts: toasts,
        addToast,
        deleteToast
    }}>
        {children}
    </ToastContext.Provider>
}

export function useToastContext() {
    return useContext(ToastContext);
}