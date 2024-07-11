"use client"

import { InferSelectModel } from "drizzle-orm";
import { FolderSearch } from "lucide-react"
import { useModalContext } from "~/context/modal"
import { patient_documents } from "~/server/db/schema";
import FileView from "./file_view";

type Props = {
    file: InferSelectModel<typeof patient_documents>
};

export default function ViewFileButton({ file }: Props) {
    const { showModal } = useModalContext();

    function openModal() {
        showModal({
            title: file.name,
            body: <FileView file_id={file.id} />,
            size: "lg"
        });
    }

    return <button className="btn btn-ghost" onClick={openModal}>
        <FolderSearch />
    </button>
}