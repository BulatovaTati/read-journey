import { useLocation, useNavigate } from 'react-router-dom';
import { Book } from '../../redux/books/books-types';

import NoBooksFound from '../NoBooksFound/NoBooksFound';
import RecommendedModals from '../Modals/RecommendedModals/RecommendedModals';
import RecommendedItem from './RecommendedItem';
import LocalLoader from '../Loader/LocalLoader';

import { isBookInfoModalData, useModalContext } from '../../context/ModalContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addBookById, deleteBook } from '../../redux/books/operations';
import { selectOwnBooks } from '../../redux/books/selectors';

import s from './RecommendedList.module.css';

interface RecommendedListProps {
  results: Book[];
  isLoading?: boolean;
}

const RecommendedList = ({ results, isLoading }: RecommendedListProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isOpen, modalType, modalData, openModal, closeModal } = useModalContext();
  const isLibraryPage = pathname.includes('library');
  const ownLibrary = useAppSelector(selectOwnBooks);

  if (isLoading) return <LocalLoader />;

  if (!results || results.length === 0) {
    return <NoBooksFound />;
  }

  const handleDelete = (bookId: string) => dispatch(deleteBook(bookId));

  const handleImageClick = (book: Book) => {
    openModal('bookInfo', {
      bookId: book._id,
      title: book.title,
      author: book.author,
      totalPages: book.totalPages,
      imageUrl: book.imageUrl,
    });
  };

  const handleAddToLibrary = () => {
    const bookExists = ownLibrary.find(item => item.title === modalData?.title);
    if (!bookExists) {
      dispatch(addBookById(modalData?.bookId!));
      openModal('addedToLibrary');
    } else {
      openModal('errorToLibrary');
    }
  };

  const handleRemoveFromLibrary = () => {
    const bookInLibrary = ownLibrary.find(
      book => book.title === modalData?.title && book.author === modalData?.author
    );

    if (bookInLibrary) {
      dispatch(deleteBook(bookInLibrary._id));
      closeModal();
    }
  };

  const isInLibrary = ownLibrary.some(book => book.title === modalData?.title);

  const handleStartReading = () => {
    if (!isBookInfoModalData(modalType, modalData)) return;

    navigate(`/reading/${modalData.bookId}`);
    closeModal();
  };

  return (
    <>
      <ul className={s.recommendedList}>
        {results.map(book => (
          <RecommendedItem
            key={book._id}
            book={book}
            isLibraryPage={isLibraryPage}
            onImageClick={handleImageClick}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      <RecommendedModals
        isOpen={isOpen}
        modalType={modalType}
        modalData={modalData}
        closeModal={closeModal}
        handleAddToLibrary={handleAddToLibrary}
        handleRemoveFromLibrary={handleRemoveFromLibrary}
        isInLibrary={isInLibrary}
        handleStartReading={handleStartReading}
        isLibraryPage={isLibraryPage}
      />
    </>
  );
};

export default RecommendedList;
