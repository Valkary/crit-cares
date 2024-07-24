"use client";

import { X } from "lucide-react";
import { ReactNode, Suspense } from "react";
import { useDrawerContext } from "~/context/drawer";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

type Props = {
    title?: string,
    trigger?: string | ReactNode,
    description?: string,
    children: ReactNode
}

export default function Drawer({ children, description, title, trigger }: Props) {
    return <Sheet>
        <SheetTrigger>
            {trigger ? trigger : "Abrir"}
        </SheetTrigger>
        <SheetContent className="w-screen min-w-full md:min-w-[50%] lg:min-w-[33.3%] overflow-y-scroll">
            <div className="w-full p-6 flex flex-col gap-2">
                <SheetHeader>
                    <SheetTitle>
                        <h2 className="text-2xl font-semibold text-primary text-center mb-4">{title}</h2>
                    </SheetTitle>
                    <SheetDescription>{description}</SheetDescription>

                    <Suspense>
                        {children}
                    </Suspense>
                </SheetHeader>
            </div>
        </SheetContent>
    </Sheet>
}