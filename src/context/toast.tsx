"use client";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import Toast from "~/components/ui/toast";

export type ToastStatus = "warning" | "error" | "info" | "success";

export type ToastType = {
    id: number,
    type: ToastStatus,
    message?: string,
    duration?: number
}

type ToastContextType = {
    toats: ToastType[]
    addToast: (type: ToastStatus, message?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType>({
    toats: [],
    addToast: () => { }
});

export default function ToastContextProvider({ children }: { children: ReactNode }) {
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

    return <ToastContext.Provider value={{
        toats: toasts,
        addToast
    }}>
        {children}
        <div className="toast z-50">
            {toasts.map(t => <Toast
                key={t.id}
                type={t.type}
                message={t.message}
                id={t.id}
                deleteToast={deleteToast}
                duration={t.duration}
            />)}
        </div>
    </ToastContext.Provider>
}

export function useToastContext() {
    return useContext(ToastContext);
}