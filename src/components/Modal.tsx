import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useKeyUp } from '../hooks/useKeyUp';
import { Button } from './Button';
import styles from './Modal.module.scss';

const MODALS_CONTAINER_ID = 'modals';

interface ModalProps {
  isVisible: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  let modalsContainer = document.getElementById(MODALS_CONTAINER_ID);

  if (!modalsContainer) {
    modalsContainer = document.createElement('div');
    modalsContainer.setAttribute('id', MODALS_CONTAINER_ID);

    document.body.appendChild(modalsContainer);
  }

  const modalRef = useRef<HTMLDivElement>(null);

  const onPressEscape = () => {
    if (onClose) {
      onClose();
    }
  };

  useKeyUp('Escape', onPressEscape);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  return createPortal((
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal} tabIndex={0}>
        <div className={styles.content}>{children}</div>
        <footer className={styles.footer}>
          <Button type="button" className={styles.close} onClick={onClose}>Close</Button>
        </footer>
      </div>
    </div>
  ), modalsContainer);
};
