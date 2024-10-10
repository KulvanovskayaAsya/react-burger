import React from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayProps {
  onClick: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClick }) => (
  <div className={styles.overlay} onClick={onClick}></div>
);

export default ModalOverlay;
