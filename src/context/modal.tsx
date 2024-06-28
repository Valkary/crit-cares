"use client";
import { useState, createContext, useContext, ReactNode } from "react";

type ModalContent = {
    title: string,
    body: ReactNode
}

type ModalContextType = {
    isOpen: boolean,
    content: ModalContent,
    setContent: (content: ModalContent) => void,
    hideModal: () => void,
    showModal: () => void,
    toggleModal: () => void
};

const initial_modal_context: ModalContextType = {
    isOpen: false,
    content: {
        title: "",
        body: <></>
    },
    setContent: () => {},
    hideModal: () => {},
    showModal: () => {},
    toggleModal: () => {},
};

const ModalContext = createContext<ModalContextType>(initial_modal_context);

export function ModalContextProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<ModalContent>({
        title: "",
        body: <></>
    });

    const hideModal = () => setOpen(false);
    const showModal = () => setOpen(true);
    const toggleModal = () => setOpen(!open);

    return <ModalContext.Provider value={{
        isOpen: open,
        content,
        setContent,
        showModal,
        hideModal,
        toggleModal,
    }}>
        {children}
    </ModalContext.Provider>
}

export function useModalContext() {
    return useContext(ModalContext);
}