"use client";
import { createContext, useContext, ReactNode, useReducer } from "react";
import Modal from "~/components/ui/modal";

export type ModalSizes = "sm" | "md" | "lg";

type ModalContent = {
    title: string,
    body: ReactNode,
    size: ModalSizes
}

type ModalValues = {
    isOpen: boolean,
    content: ModalContent,
}

type ModalFunctions = {
    hideModal: () => void,
    showModal: (content?: ModalContent) => void,
    toggleModal: () => void
}

type ModalContextType = ModalValues & ModalFunctions;

const initial_modal_context: ModalContextType = {
    isOpen: false,
    content: {
        title: "",
        body: <></>,
        size: "md",
    },
    hideModal: () => {},
    showModal: () => {},
    toggleModal: () => {},
};

const ModalContext = createContext<ModalContextType>(initial_modal_context);

function reducer(state: ModalValues, action: Partial<ModalValues>): ModalValues {
    return {
        ...state,
        ...action
    }
}

export default function ModalContextProvider({ children }: { children: ReactNode }) {
    const [modalState, setModalState] = useReducer(reducer, initial_modal_context);

    function showModal(content?: ModalContent) {
        setModalState({
            ...modalState,
            isOpen: true,
            content: content ?? modalState.content
        });
    }

    function hideModal() {
        setModalState({ ...modalState, isOpen: false });
    }

    function toggleModal() {
        setModalState({ ...modalState, isOpen: !modalState.isOpen });
    }

    return <ModalContext.Provider value={{
        ...modalState,
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