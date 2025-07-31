import { JSX } from 'react';

import Pagination from '../Pagination/Pagination';
import Dashboard from '../Dashboard/Dashboard';
import Quote from '../Quote/Quote';
import Workout from '../Workout/Workout';
import Filter from '../Filter/Filter';
import RecommendedList from '../RecommendedList/RecommendedList';

import useMedia from '../../hooks/useMedia';
import { useRecommendedBooks } from '../../hooks/useRecommendedBooks';

import s from './Recommended.module.css';

const Recommended = (): JSX.Element => {
  const { isDesktop } = useMedia();
  const { results, isLoading, page, totalPages, handlePageChange } = useRecommendedBooks();

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
