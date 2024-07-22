"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type DrawerContextType = {
    isOpen: boolean,
    content: ReactNode,
    showDrawer: (content: ReactNode) => void,
    closeDrawer: () => void,
}

const DrawerContext = createContext<DrawerContextType>({
    isOpen: false,
    content: <></>,
    closeDrawer: () => { },
    showDrawer: () => { }
});

export default function DrawerContextProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<ReactNode>(<></>);

    function showDrawer(content: ReactNode) {
        setContent(content);
        setOpen(true);
    }

    function closeDrawer() {
        setOpen(false);
    }

    return <DrawerContext.Provider value={{
        isOpen: open,
        content,
        showDrawer,
        closeDrawer,
    }}>
        {children}
    </DrawerContext.Provider>
}

export function useDrawerContext() {
    return useContext(DrawerContext);
}

export function DrawerButton({ className, drawerContent, children }: { className: string, drawerContent: ReactNode, children: ReactNode }) {
    const { showDrawer } = useDrawerContext();

    return <button className={className} onClick={() => showDrawer(drawerContent)}>
        {children}
    </button>
}