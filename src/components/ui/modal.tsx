"use client";
import { Suspense, useEffect, useRef } from "react"
import { useModalContext } from "~/context/modal";

export default function Modal() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { isOpen, content, hideModal } = useModalContext();

  useEffect(() => {
    isOpen ?
      modalRef.current?.showModal() :
      modalRef.current?.close()
  }, [isOpen]);

  return <dialog className="modal modal-bottom sm:modal-middle min-w-fit" ref={modalRef}>
    <div className="modal-box overflow-hidden">
      <h3 className="font-bold text-lg">{content.title}</h3>
      <Suspense fallback={<span>loading content...</span>}>
        {content.body}
      </Suspense>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button onClick={hideModal}>close</button>
    </form>
  </dialog>
}