import { useState } from 'react';

type ModalType = keyof ModalDataMap;

type ModalDataMap = {
  bookInfo: {
    bookId: string;
    title: string;
    author: string;
  };
  addedToLibrary: undefined;
  startTraining: undefined;
};

export const useModal = () => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalData, setModalData] = useState<ModalDataMap[keyof ModalDataMap] | null>(null);

  const openModal = <T extends ModalType>(
    type: T,
    data: ModalDataMap[T] = undefined as ModalDataMap[T]
  ) => {
    setModalType(type);
    setModalData(data);
  };

  const closeModal = () => {
    setModalType(null);
    setModalData(null);
  };

  const isOpen = modalType !== null;

  return {
    modalType,
    modalData,
    isOpen,
    openModal,
    closeModal,
  };
};
