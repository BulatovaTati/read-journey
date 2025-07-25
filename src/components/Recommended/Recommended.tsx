import { JSX, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';

import Dashboard from '../Dashboard/Dashboard';
import useMedia from '../../hooks/useMedia';
import Quote from '../Quote/Quote';
import Workout from '../Workout/Workout';
import Filter from '../Filter/Filter';
import { useAppDispatch } from '../../redux/hooks';
import { fetchRecommendedBooks } from '../../redux/books/operations';
import { selectBookData, selectIsLoading, selectTotalPages } from '../../redux/books/selectors';
import RecommendedList from '../RecommendedList/RecommendedList';

import s from './Recommended.module.css';

const calculateLimit = (width: number): number => {
  if (width < 768) {
    return 2;
  } else if (width >= 768 && width < 1280) {
    return 8;
  } else {
    return 10;
  }
};

const Recommended = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const results = useSelector(selectBookData);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  const { isDesktop } = useMedia();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(calculateLimit(window.innerWidth));

  useEffect(() => {
    const handleResize = (): void => {
      const newWidth = window.innerWidth;
      const newLimit = calculateLimit(newWidth);
      setLimit(newLimit);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
