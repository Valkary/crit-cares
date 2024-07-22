"use client";

import { X } from "lucide-react";
import { Suspense } from "react";
import { useDrawerContext } from "~/context/drawer";

export default function Drawer() {
    const { isOpen, content, closeDrawer } = useDrawerContext();

    return <div className="drawer drawer-end z-20">
        <input type="checkbox" className="drawer-toggle" readOnly checked={isOpen} />
        <div className="drawer-side">
            <div aria-label="close sidebar" className="drawer-overlay" onClick={closeDrawer} />
            <div className="menu bg-base-200 text-base-content min-h-full w-full md:w-2/3 lg:w-1/2 p-4">
                <div className="w-full flex justify-end">
                    <button className="btn btn-ghost btn-circle flex md:hidden" onClick={closeDrawer}>
                        <X />
                    </button>
                </div>
                <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
                    {content}
                </Suspense>
            </div>
        </div>
    </div>
}