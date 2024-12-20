import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';

import styles from './modal.module.css';

interface IModalProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.getElementById('modals') as HTMLElement; // Портал

export const Modal: React.FC<IModalProps> = ({ title, onClose, children }) => {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </>,
    modalRoot
  );
};
