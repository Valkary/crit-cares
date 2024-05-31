import { JSX, createSignal } from "solid-js";

interface ModalProps {
    children: JSX.Element;
    id: string
}

interface ModalContentProps {
    title: string;
    children: JSX.Element;
}

const [id, setID] = createSignal("");

const Modal = (props: ModalProps) => {
    setID(props.id);

    return (
        <dialog id={id()} class="modal modal-bottom sm:modal-middle">
            {props.children}
        </dialog>
    );
};

const ModalContent = (props: ModalContentProps) => {
    return <div class="modal-box">
        <h3 class="font-bold text-lg">{props.title}</h3>
        {props.children}
    </div>;
};

const CloseButton = (props: { title: string }) => {
    return <div class="modal-action">
        <form method="dialog">
            <button class="btn">{props.title}</button>
        </form>
    </div>
}

Modal.Button = (props: { children: JSX.Element }) => {
    return (
        <button
            class="btn"
            // @ts-ignore
            onClick={() => document.getElementById(id()).showModal()}
        >
            {props.children}
        </button>
    );
};

Modal.CloseButton = CloseButton;
Modal.Content = ModalContent;

export default Modal;
