import React from 'react';

import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClick: () => void;
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ onClick }) => (
  <div className={styles.overlay} onClick={onClick}></div>
);

export default ModalOverlay;
