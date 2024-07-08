"use client";

import { get_document_by_id } from "~/data/files";
import { useEffect, useState } from "react";

export default function FileView({ file_id }: { file_id: number }) {
    const [blobURL, setBlobURL] = useState("");

    useEffect(() => {
        async function fetchFile() {
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
                setBlobURL(blobUrl);
            } catch (err) {
                console.error(err);
            }
        }

        fetchFile();

        return () => {
            URL.revokeObjectURL(blobURL);
        }
    }, [file_id]);

    return <iframe id="serviceFrameSend" src={blobURL} width="100%" height="100%" />;
}
