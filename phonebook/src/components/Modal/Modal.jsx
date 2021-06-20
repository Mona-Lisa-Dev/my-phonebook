import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const onEscHandler = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onEscHandler);

    return () => {
      window.removeEventListener('keydown', onEscHandler);
    };
  }, [onClose]);

  // const handleOverlayClick = event => {
  //   if (event.currentTarget === event.target) {
  //     onClose();
  //   }
  // };

  return createPortal(
    <div className={styles.backdrop}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
