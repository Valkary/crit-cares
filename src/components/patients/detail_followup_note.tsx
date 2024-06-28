"use client";
import { FolderSearch } from "lucide-react";
import { useModalContext } from "~/context/modal";
import { FollowupNoteModel } from "~/data/followup_notes/get_followup_notes";

type Props = { patient_id: number, note: FollowupNoteModel };

export default function DetailFollowupNote({ patient_id, note }: Props) {
    const { showModal, setContent } = useModalContext();

    function openModal() {
        setContent({
            title: "Test title",
            body: <>Test body</>
        });
        showModal();
    }

    return (
        <button className="btn btn-ghost" onClick={openModal}>
            <FolderSearch />
        </button>
    );
}
