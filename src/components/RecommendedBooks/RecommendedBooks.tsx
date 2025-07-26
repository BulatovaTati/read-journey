import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import RecommendedBooksList from '../RecommendedBooksList/RecommendedBooksList';
import Pagination from '../Pagination/Pagination';
import Icon from '../Icon/Icon';

import { fetchRecommendedBooks } from '../../redux/books/operations';
import { useAppDispatch } from '../../redux/hooks';
import { selectBookData, selectTotalPages } from '../../redux/books/selectors';

import { Book } from '../../redux/books/books-types';

import s from './RecommendedBooks.module.css';

const RecommendedBooks: FC = () => {
  const results = useSelector(selectBookData) as Book[];
  const totalPages = useSelector(selectTotalPages) as number;
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchRecommendedBooks({ page }));
  }, [dispatch, page]);

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className={s.container}>
      <h2 className={s.heading}>Recommended books</h2>

      <RecommendedBooksList results={results} />
      <Pagination totalPages={totalPages} handlePageChange={handlePageChange} page={page} />

      <Link to="/recommended" className={s.link}>
        Home
        <Icon iconName="icon-arrow" className={s.icon} width="24" height="24" />
      </Link>
    </div>
  );
};

export default RecommendedBooks;
