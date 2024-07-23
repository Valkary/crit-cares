"use client";

import { InferSelectModel } from "drizzle-orm";
import { FolderSearch } from "lucide-react";
import { useModalContext } from "~/context/modal";
import { patient_documents } from "~/server/db/schema";
import FileView from "./file_view";
import { useQuery } from "@tanstack/react-query";
import { get_document_by_id } from "~/data/files";

type Props = {
    file: InferSelectModel<typeof patient_documents>;
};

async function fetchDocument(file_id: number) {
    const res = await get_document_by_id(file_id);

    if (!res.success || !res.data[0]) throw new Error("Error");

    const binaryString = atob(res.data[0].buffer);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
}

export default function ViewFileButton({ file }: Props) {
    const { showModal } = useModalContext();

    const { data, status } = useQuery({
        queryKey: ["patient_file", file.id],
        queryFn: () => fetchDocument(file.id)
    });

    async function openModal() {
        showModal({
            title: file.name,
            body: <FileView file_url={status === "success" ? data : ""} />,
            size: "lg",
        });
    }

    return (
        <button className="btn btn-ghost" onClick={openModal} disabled={status === "pending"}>
            <FolderSearch />
        </button>
    );
}
