import { FC } from 'react';
import mobBooks from '/images/book-mobile.png';
import mobBooks2x from '/images/book-mobile@2x.png';
import books from '/images/book-desktop.png';
import books2x from '/images/book-desktop@2x.png';
import ModalWrapper from '../../ModalWrapper/ModalWrapper';

import s from './IsReadBookModal.module.css';

type IsReadBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const IsReadBookModal: FC<IsReadBookModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <picture>
        <source srcSet={`${mobBooks} 1x, ${mobBooks2x} 2x`} media="(max-width: 767.98px)" />
        <source srcSet={`${books} 1x, ${books2x} 2x`} media="(min-width: 768px)" />
        <img className={s.image} src={books} alt="add book" />
      </picture>
      <p className={s.title}>The book is read</p>
      <h2 className={s.text}>
        It was an <span className={s.name}>exciting journey</span>, where each page revealed new
        horizons, and the characters became inseparable friends.
      </h2>
    </ModalWrapper>
  );
};
export default IsReadBookModal;
