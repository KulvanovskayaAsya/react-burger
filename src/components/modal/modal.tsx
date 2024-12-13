import React, { ReactNode, useEffect } from 'react';
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
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div
        className={styles.modal}
        data-testid='modal'
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            data-testid='modal-close-button'
          >
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
