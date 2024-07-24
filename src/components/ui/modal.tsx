"use client";
import { ReactNode, Suspense, useEffect, useRef } from "react"
import { ModalSizes, useModalContext } from "~/context/modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const sizes: Record<ModalSizes, string> = {
  "sm": "",
  "md": "",
  "lg": "md:max-w-7xl md:max-h-full h-[90%]"
};

export default function Modal() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { isOpen, content, hideModal } = useModalContext();

  useEffect(() => {
    isOpen ?
      modalRef.current?.showModal() :
      modalRef.current?.close()
  }, [isOpen]);

  return <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>

}

type ModalButtonProps = {
  modalContent: ReactNode,
  children: ReactNode,
};

export function ModalButton({ children, modalContent }: ModalButtonProps) {
  const { showModal } = useModalContext();

  function openModalWithContent() {
    showModal({
      body: modalContent,
      size: "md",
      title: ""
    });
  }

  return <button className="btn" onClick={openModalWithContent}>
    {children}
  </button>
}