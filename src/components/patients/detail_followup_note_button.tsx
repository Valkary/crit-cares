"use client";
import { FolderSearch } from "lucide-react";
import { useModalContext } from "~/context/modal";
import { FollowupNoteModel } from "~/data/followup_notes/get_followup_notes";
import DetailFollowupNote from "./detail_followup_note";

type Props = { patient_id: number, note: FollowupNoteModel };

export default function DetailFollowupNoteButton({ patient_id, note }: Props) {
    const { showModal } = useModalContext();

    function openModal() {
        showModal({
            title: `Nota de seguimiento`,
            body: <DetailFollowupNote note_id={note.id} />,
            size: "md"
        });
    }

    return (
        <button className="btn btn-ghost" onClick={openModal}>
            <FolderSearch />
        </button>
    );
}
