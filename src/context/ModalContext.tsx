import { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = keyof ModalDataMap;

type ModalDataMap = {
  bookInfo: {
    bookId: string;
    title: string;
    author: string;
    totalPages: number;
    imageUrl: string;
  };
  addedToLibrary: undefined;
  errorToLibrary: undefined;
  startTraining: undefined;
};

interface ModalContextType {
  modalType: ModalType | null;
  modalData: ModalDataMap[keyof ModalDataMap] | null;
  isOpen: boolean;
  openModal: <T extends ModalType>(type: T, data?: ModalDataMap[T]) => void;
  closeModal: () => void;
}

export const isBookInfoModalData = (
  modalType: ModalType | null,
  modalData: ModalDataMap[keyof ModalDataMap] | null
): modalData is ModalDataMap['bookInfo'] => {
  return modalType === 'bookInfo' && modalData !== null;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalData, setModalData] = useState<ModalDataMap[keyof ModalDataMap] | null>(null);

  const openModal = <T extends ModalType>(type: T, data?: ModalDataMap[T]) => {
    setModalType(type);
    setModalData(data ?? null);
  };

  const closeModal = () => {
    setModalType(null);
    setModalData(null);
    document.body.classList.remove('ReactModal__Body--open');
  };

  return (
    <ModalContext.Provider
      value={{ modalType, modalData, isOpen: modalType !== null, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
