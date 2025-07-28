import Modal from 'react-modal';
import { ReactNode } from 'react';
import Icon from '../Icon/Icon';

import s from './ModalWrapper.module.css';

Modal.setAppElement('#root');

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalWrapper = ({ children, isOpen, onClose }: ModalWrapperProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
      ariaHideApp={true}
    >
      <button type="button" className={s.closeBtn} onClick={onClose}>
        <Icon iconName="icon-x" className={s.iconClose} width={22} height={22} />
      </button>
      {children}
    </Modal>
  );
};

export default ModalWrapper;
