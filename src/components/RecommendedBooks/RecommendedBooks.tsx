import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Icon from '../Icon/Icon';
import { fetchRecommendedBooks } from '../../redux/books/operations';
import { selectBookData } from '../../redux/books/selectors';

import s from './RecommendedBooks.module.css';
import Pagination from '../Pagination/Pagination';

const RecommendedBooks = () => {
  const results = useSelector(selectBookData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendedBooks({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className={s.container}>
      <h2 className={s.heading}>Recommended books</h2>

      <ul className={s.list}>
        {results?.slice(3, 6).map(book => (
          <li className={s.item} key={book._id}>
            <img src={book.imageUrl} alt={book.title} className={s.image} />
            <p className={s.title}>{book.title}</p>
            <p className={s.author}>{book.author}</p>
          </li>
        ))}
      </ul>
      <Pagination />
      <Link to="/recommended" className={s.link}>
        Home
        <Icon iconName="icon-arrow" className={s.icon} width="24" height="24" />
      </Link>
    </div>
  );
};

export default RecommendedBooks;
