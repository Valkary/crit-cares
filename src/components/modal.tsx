import { JSX, Component } from "solid-js";

interface ModalProps {
  children: JSX.Element;
}

interface ModalContentProps {
  title: string;
  children: JSX.Element;
}

const createModal = (modalId: string) => {
  const Modal: Component<ModalProps> = (props) => {
    return (
      <dialog id={modalId} class="modal modal-bottom sm:modal-middle">
        {props.children}
      </dialog>
    );
  };

  const Content: Component<ModalContentProps> = (props) => {
    return (
      <div class="modal-box">
        <h3 class="font-bold text-lg">{props.title}</h3>
        {props.children}
      </div>
    );
  };

  const CloseButton: Component<{ title: string }> = (props) => {
    return (
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">{props.title}</button>
        </form>
      </div>
    );
  };

  const OpenButton: Component<{ children: JSX.Element }> = (props) => {
    return (
      <button
        class="btn"
        // @ts-ignore
        onClick={() => document.getElementById(modalId)?.showModal()}
      >
        {props.children}
      </button>
    );
  };

  return { Modal, OpenButton, Content, CloseButton };
};

export default createModal;
