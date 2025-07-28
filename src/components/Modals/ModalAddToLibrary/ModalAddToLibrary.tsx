import ModalWrapper from '../../ModalWrapper/ModalWrapper';
import notFoundImg2x from '/images/desktop-default-image@2x.jpg';
import s from './ModalAddToLibrary.module.css';

interface ModalAddToLibraryProps {
  modalData: {
    bookId: string;
    title: string;
    author: string;
    totalPages: number;
    imageUrl: string;
  };
  isOpen: boolean;
  closeModal: () => void;
  onClick: () => void;
}

const ModalAddToLibrary = ({ modalData, isOpen, closeModal, onClick }: ModalAddToLibraryProps) => {
  if (!modalData) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal}>
      <img src={modalData.imageUrl || notFoundImg2x} />
      <h2 className={s.title}>{modalData.title}</h2>
      <p className={s.author}>{modalData.author}</p>
      <p className={s.author}>{modalData.totalPages} pages</p>
      <button className={s.addButton} onClick={onClick}>
        Add to library
      </button>
    </ModalWrapper>
  );
};

export default ModalAddToLibrary;
