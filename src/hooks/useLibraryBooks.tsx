import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks';
import { fetchOwnBooks } from '../redux/books/operations';
import { selectOwnBooks } from '../redux/books/selectors';
import useMedia from './useMedia';
import { Book } from '../redux/books/books-types';

export const useLibraryBooks = () => {
  const dispatch = useAppDispatch();
  const ownBooks = useSelector(selectOwnBooks) as Book[];

  const { isMobile, isTablet } = useMedia();
  const limit = isMobile ? 2 : isTablet ? 8 : 10;

  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(ownBooks.length / limit);
  const paginatedBooks = ownBooks.slice((page - 1) * limit, page * limit);

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    dispatch(fetchOwnBooks());
  }, [dispatch]);

  return { paginatedBooks, totalPages, page, handlePageChange };
};
