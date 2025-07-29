import { FC } from 'react';
import likeDesktop2x from '/images/like-desktop@2x.png';
import likeDesktop from '/images/like-desktop.png';
import likeMobile2x from '/images/like-mobile@2x.png';
import likeMobile from '/images/like-mobile.png';
import ModalWrapper from '../../ModalWrapper/ModalWrapper';

import s from './SuccessModal.module.css';

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SuccessModal: FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <picture>
        <source srcSet={`${likeMobile} 1x, ${likeMobile2x} 2x`} media="(max-width: 767.98px)" />
        <source srcSet={`${likeDesktop} 1x, ${likeDesktop2x} 2x`} media="(min-width: 768px)" />
        <img className={s.image} src={likeDesktop} alt="add book" />
      </picture>
      <p className={s.title}>Good job</p>
      <h2 className={s.text}>
        Your book is now in <span className={s.name}>the library!</span> The joy knows no bounds and
        now you can start your training
      </h2>
    </ModalWrapper>
  );
};
export default SuccessModal;
