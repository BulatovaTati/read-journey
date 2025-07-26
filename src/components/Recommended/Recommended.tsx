import { JSX, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';

import Dashboard from '../Dashboard/Dashboard';
import Quote from '../Quote/Quote';
import Workout from '../Workout/Workout';
import Filter from '../Filter/Filter';
import RecommendedList from '../RecommendedList/RecommendedList';

import useMedia from '../../hooks/useMedia';

import { useAppDispatch } from '../../redux/hooks';
import { Book } from '../../redux/books/books-types';
import { fetchRecommendedBooks } from '../../redux/books/operations';
import { selectBookData, selectIsLoading, selectTotalPages } from '../../redux/books/selectors';

import s from './Recommended.module.css';

const Recommended = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const results = useSelector(selectBookData) as Book[];
  const totalPages = useSelector(selectTotalPages) as number;
  const isLoading = useSelector(selectIsLoading) as boolean;
  const [page, setPage] = useState<number>(1);

  const { isMobile, isTablet, isDesktop } = useMedia();
  const limit = isMobile ? 2 : isTablet ? 8 : 10;

  useEffect(() => {
    dispatch(fetchRecommendedBooks({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <Dashboard>
        <Filter />
        <Workout />
        {isDesktop && <Quote />}
      </Dashboard>

      <div className={s.recommended}>
        <div className={s.pagination}>
          <h1 className={s.title}>Recommended</h1>
          <Pagination totalPages={totalPages} handlePageChange={handlePageChange} page={page} />
        </div>
        <RecommendedList results={results} isLoading={isLoading} />
      </div>
    </>
  );
};

export default Recommended;
