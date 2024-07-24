import { ReactNode, Suspense } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
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
        <SheetContent className="w-screen min-w-full md:min-w-[60%] lg:min-w-[40%] overflow-y-scroll">
            <div className="w-full p-6 flex flex-col gap-2">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-semibold text-primary text-center mb-4">
                        {title}
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