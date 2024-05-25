import { FC, ReactNode } from "react";

import css from "./styles.module.css";

interface ModalProps {
  open: boolean;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
