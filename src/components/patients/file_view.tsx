"use client";

import { get_document_by_id } from "~/data/files";
import { useEffect, useState } from "react";

type Status = "pending" | "success" | "error";

export default function FileView({ file_id }: { file_id: number }) {
    const [blobURL, setBlobURL] = useState("");
    const [status, setStatus] = useState<Status>("pending");

    useEffect(() => {
        async function fetchFile() {
            setStatus("pending");
            try {
                const res = await get_document_by_id(file_id);

                if (!res.success || !res.data[0]) throw new Error("Error");

                const binaryString = atob(res.data[0].buffer);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                const blob = new Blob([bytes], { type: 'application/pdf' });
                const blobUrl = URL.createObjectURL(blob);

                setStatus("success");
                setBlobURL(blobUrl);
            } catch (err) {
                setStatus("error");
            }
        }

        fetchFile();

        return () => {
            URL.revokeObjectURL(blobURL);
        }
    }, [file_id]);

    return <>
        {
            status === "success" ?
                <iframe id="serviceFrameSend" src={blobURL} className="w-full h-full" /> :
                status === "error" ?
                    <span>Error mostrando el archivo</span> :
                    <span className="loading loading-spinner loading-lg"></span>
        }
    </>;
}
