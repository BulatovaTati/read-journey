import { FC } from 'react';
import { Book } from '../../redux/books/books-types';
import s from './RecommendedList.module.css';
import Loader from '../Loader/Loader';
import NoBooksFound from '../NoBooksFound/NoBooksFound';

interface RecommendedListProps {
  results: Book[];
  isLoading: boolean;
}

const RecommendedList: FC<RecommendedListProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className={s.listContainer}>
        <Loader modClass={s.listLoader} />
      </div>
    );
  }

  if (!results || results.length === 0) {
    return <NoBooksFound />;
  }

  return (
    <ul className={s.recommendedList}>
      {results.map(book => (
        <li className={s.recommendedItem} key={book._id}>
          <img src={book.imageUrl} alt={book.title} className={s.image} />
          <div className={s.info}>
            <p className={s.title}>{book.title}</p>
            <p className={s.author}>{book.author}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecommendedList;
