'use client';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Loader2Icon } from 'lucide-react';
import { type ReactNode, Suspense, useEffect, useRef } from 'react';
import { type ModalSizes, useModalContext } from '~/context/modal';
import { Button } from './button';

const sizes: Record<ModalSizes, string> = {
	sm: '',
	md: '',
	lg: 'md:max-w-7xl h-[90%]',
};

export default function Modal() {
	const modalRef = useRef<HTMLDialogElement>(null);
	const { isOpen, content, hideModal } = useModalContext();

	useEffect(() => {
		isOpen ? modalRef.current?.showModal() : modalRef.current?.close();
	}, [isOpen]);

	return (
		<Dialog open={isOpen} onOpenChange={hideModal} modal>
			<DialogContent
				className={`max-h-[90%] overflow-y-scroll flex flex-col ${sizes[content.size]}`}
			>
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-primary">
						{content.title}
					</DialogTitle>
				</DialogHeader>
				<Suspense
					fallback={<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
				>
					{content.body}
				</Suspense>
			</DialogContent>
		</Dialog>
	);
}

type ModalButtonProps = {
	modalContent: ReactNode;
	children: ReactNode;
};

export function ModalButton({ children, modalContent }: ModalButtonProps) {
	const { showModal } = useModalContext();

	function openModalWithContent() {
		showModal({
			body: modalContent,
			size: 'md',
			title: '',
		});
	}

	return (
		<Button
			className="w-full"
			variant={'secondary'}
			size={'lg'}
			onClick={openModalWithContent}
		>
			{children}
		</Button>
	);
}
