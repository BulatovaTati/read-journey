import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks';
import useMedia from './useMedia';
import { fetchRecommendedBooks } from '../redux/books/operations';
import { selectBookData, selectIsLoading, selectTotalPages } from '../redux/books/selectors';
import { Book } from '../redux/books/books-types';

export const useRecommendedBooks = () => {
  const dispatch = useAppDispatch();
  const { isMobile, isTablet } = useMedia();
  const limit = isMobile ? 2 : isTablet ? 8 : 10;

  const [page, setPage] = useState<number>(1);

  const results = useSelector(selectBookData) as Book[];
  const totalPages = useSelector(selectTotalPages) as number;
  const isLoading = useSelector(selectIsLoading) as boolean;

  useEffect(() => {
    dispatch(fetchRecommendedBooks({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return { results, isLoading, page, totalPages, handlePageChange };
};
