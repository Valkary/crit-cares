import { JSX, Component, createSignal, createEffect } from "solid-js";
import { X } from "lucide-solid";

interface ModalProps {
    children: JSX.Element;
}

interface ModalContentProps {
    title: string;
    children: JSX.Element;
}

const createModal = (id: string) => {
    const [isOpen, setIsOpen] = createSignal(false);

    createEffect(() => {
        const element = document.getElementById(id);

        if (element !== null) {
            // @ts-ignore
            isOpen() ? element.showModal() : element.close();
        }
    });

    const Modal: Component<ModalProps> = (props) => {
        return (
            <dialog id={id} class="modal modal-bottom sm:modal-middle">
                {props.children}
            </dialog>
        );
    };

    const Content: Component<ModalContentProps> = (props) => {
        return (
            <div class="modal-box">
                <div class="flex w-full">
                    <h3 class="font-bold text-lg flex-grow">{props.title}</h3>
                    <button class="btn-ghost" onclick={closeModal}>
                        <X />
                    </button>
                </div>
                {props.children}
            </div>
        );
    };

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const OpenButton: Component<{ children: JSX.Element }> = (props) => {
        return (
            <button
                class="btn"
                onClick={openModal}
            >
                {props.children}
            </button>
        );
    };

    return { Modal, OpenButton, Content, openModal, closeModal, isOpen, setIsOpen };
};

export default createModal;
