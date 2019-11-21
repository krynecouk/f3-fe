import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

interface ModalProps {
  id: string;
  visible: boolean;
  content: JSX.Element;
  title?: string;
  onDismiss?: () => void;
  footer?: JSX.Element;
}

export const Modal: FunctionComponent<ModalProps> = ({
  id,
  visible,
  title,
  content,
  footer,
  onDismiss
}) => {
  return ReactDOM.createPortal(
    <div
      onClick={onDismiss}
      className={`modal modal--${visible ? "visible" : "hidden"}`}
      id={id}
    >
      <section onClick={e => e.stopPropagation()} className="modal__content">
        <header>
          <span className="modal__title">{title}</span>
          <a
            onClick={onDismiss}
            href="/#"
            className={`modal__close modal__close--${
              onDismiss ? "visible" : "hidden"
            }`}
          >
            &times;
          </a>
        </header>
        <div className="modal__main">{content}</div>
        {!!footer && <footer>{footer}</footer>}
      </section>
    </div>,
    document.querySelector("#modal-root")!
  );
};
