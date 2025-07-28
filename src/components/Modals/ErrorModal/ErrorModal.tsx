import { FC } from 'react';

import ModalWrapper from '../../ModalWrapper/ModalWrapper';
import s from '../SuccessModal/SuccessModal.module.css';

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ErrorModal: FC<ErrorModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <p className={s.successMessage}>Ooops</p>
      <h2 className={s.text}>
        The book <span className={s.name}>has already been added</span> to the library!
      </h2>
    </ModalWrapper>
  );
};
export default ErrorModal;
