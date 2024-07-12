"use client";

import { ToastStatus, ToastType } from "~/context/toast";
import { InfoIcon, BanIcon, CheckIcon, TriangleAlertIcon } from "lucide-react";
import { ReactNode, useEffect } from "react";

const icons: Record<ToastStatus, ReactNode> = {
    error: <BanIcon />,
    info: <InfoIcon />,
    success: <CheckIcon />,
    warning: <TriangleAlertIcon />
}

const alert_types: Record<ToastStatus, string> = {
    error: "alert-error",
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
}

type Props = ToastType & {
    deleteToast: (id: number) => void
}

export default function Toast({ type, message, duration, id, deleteToast }: Props) {
    useEffect(() => {
        setTimeout(() => {
            deleteToast(id);
        }, duration ?? 3000);
    }, [])

    return <div className={`alert ${alert_types[type]} min-w-[300px] grid grid-cols-[1fr 4fr] grid-rows-2 justify-center align-middle gap-0`}>
        <button
            onClick={() => deleteToast(id)}
            className="btn btn-ghost btn-circle col-start-1 uppercase font-bold"
        >{icons[type]}</button>
        <span className="col-start-2 uppercase font-bold grow">{type}</span>
        <span className="col-start-2">{message}</span>
    </div>
}