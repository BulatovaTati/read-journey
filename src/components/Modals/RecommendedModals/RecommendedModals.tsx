import { FC } from 'react';
import ModalAddToLibrary from '../ModalAddToLibrary/ModalAddToLibrary';
import SuccessModal from '../SuccessModal/SuccessModal';
import ErrorModal from '../ErrorModal/ErrorModal';
import { Book } from '../../../redux/books/books-types';

interface RecommendedModalsProps {
  isOpen: boolean;
  modalType: string | null;
  modalData: any;
  closeModal: () => void;
  handleAddToLibrary: () => void;
  handleRemoveFromLibrary: () => void;
  isInLibrary: boolean;
}

const RecommendedModals: FC<RecommendedModalsProps> = ({
  isOpen,
  modalType,
  modalData,
  closeModal,
  handleAddToLibrary,
  handleRemoveFromLibrary,
  isInLibrary,
}) => {
  if (!isOpen) return null;

  switch (modalType) {
    case 'bookInfo':
      return (
        <ModalAddToLibrary
          modalData={modalData}
          isOpen={isOpen}
          closeModal={closeModal}
          onClick={handleAddToLibrary}
          onRemoveClick={handleRemoveFromLibrary}
          isInLibrary={isInLibrary}
        />
      );
    case 'addedToLibrary':
      return <SuccessModal isOpen={isOpen} onClose={closeModal} />;
    case 'errorToLibrary':
      return <ErrorModal isOpen={isOpen} onClose={closeModal} />;
    default:
      return null;
  }
};

export default RecommendedModals;
