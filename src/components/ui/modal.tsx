"use client";
import { Suspense, useEffect, useRef } from "react"
import { ModalSizes, useModalContext } from "~/context/modal";

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

  return <dialog className="modal modal-bottom sm:modal-middle" ref={modalRef}>
    <div className={`modal-box py-10 flex flex-col ${sizes[content.size]}`}>
      <h3 className="font-bold text-lg">{content.title}</h3>
      <div className="w-full max-h-full flex-grow flex justify-center items-center">
        <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
          {content.body}
        </Suspense>
      </div>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button onClick={hideModal}>close</button>
    </form>
  </dialog>
}