import ModalAddToLibrary from '../ModalAddToLibrary/ModalAddToLibrary';
import SuccessModal from '../SuccessModal/SuccessModal';
import ErrorModal from '../ErrorModal/ErrorModal';

interface RecommendedModalsProps {
  isOpen: boolean;
  modalType: string | null;
  modalData: any;
  closeModal: () => void;
  handleAddToLibrary: () => void;
  handleRemoveFromLibrary: () => void;
  isInLibrary: boolean;
  handleStartReading?: () => void;
  isLibraryPage: boolean;
}

const RecommendedModals = ({
  isOpen,
  modalType,
  modalData,
  closeModal,
  handleAddToLibrary,
  handleRemoveFromLibrary,
  isInLibrary,
  handleStartReading,
  isLibraryPage,
}: RecommendedModalsProps) => {
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
          handleStartReading={handleStartReading}
          isLibraryPage={isLibraryPage}
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
