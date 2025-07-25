import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Icon from '../Icon/Icon';
import { fetchRecommendedBooks } from '../../redux/books/operations';
import { useAppDispatch } from '../../redux/hooks';
import { selectBookData, selectTotalPages } from '../../redux/books/selectors';

import Pagination from '../Pagination/Pagination';
import s from './RecommendedBooks.module.css';
import RecommendedBooksList from '../RecommendedBooksList/RecommendedBooksList';

const RecommendedBooks = () => {
  const results = useSelector(selectBookData);
  const totalPages = useSelector(selectTotalPages);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchRecommendedBooks({ page }));
  }, [dispatch, page]);

  const handlePageChange = newPage => {
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
