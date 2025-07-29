import { FC } from 'react';

import ModalWrapper from '../../ModalWrapper/ModalWrapper';
import s from '../ModalAddToLibrary/ModalAddToLibrary.module.css';

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ErrorModal: FC<ErrorModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <p className={s.title}>Ooops</p>
      <h2 className={s.author}>
        The book has <span className={s.name}>already</span> been added to the library!
      </h2>
    </ModalWrapper>
  );
};
export default ErrorModal;
