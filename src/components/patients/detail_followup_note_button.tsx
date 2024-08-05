'use client';
import { useQuery } from '@tanstack/react-query';
import { FolderSearch, LoaderCircleIcon, XIcon } from 'lucide-react';
import { useModalContext } from '~/context/modal';
import type { FollowupNoteModel } from '~/data/followup_notes/get_followup_notes';
import DetailFollowupNote from './detail_followup_note';

type Props = { patient_id: number; note: FollowupNoteModel };

export default function DetailFollowupNoteButton({ note }: Props) {
	const { showModal } = useModalContext();

	const { data, status } = useQuery({
		queryKey: ['patient_file', note.id],
		queryFn: () => DetailFollowupNote({ note_id: note.id }),
	});

	function openModal() {
		showModal({
			title: 'Nota de seguimiento',
			body: data,
			size: 'md',
		});
	}

	return (
		<button className="btn btn-ghost" type="button" onClick={openModal}>
			{status === 'pending' ? (
				<LoaderCircleIcon className="animate-spin" />
			) : status === 'error' ? (
				<XIcon color="red" />
			) : (
				<FolderSearch />
			)}
		</button>
	);
}
