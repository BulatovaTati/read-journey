import { FC } from 'react';
import { Book } from '../../redux/books/books-types';
import Loader from '../Loader/Loader';
import NoBooksFound from '../NoBooksFound/NoBooksFound';

import notFoundImg2x from '/images/desktop-default-image@2x.jpg';
import s from './RecommendedList.module.css';
import Icon from '../Icon/Icon';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { deleteBook } from '../../redux/books/operations';

interface RecommendedListProps {
  results: Book[];
  isLoading?: boolean;
}

const RecommendedList: FC<RecommendedListProps> = ({ results, isLoading }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isLibraryPage = pathname.includes('library');

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

  const handleDelete = (bookId: string) => {
    dispatch(deleteBook(bookId));
  };

  return (
    <ul className={s.recommendedList}>
      {results.map(book => {
        const imageSrc = book.imageUrl ? book.imageUrl : notFoundImg2x;

        return (
          <li className={s.recommendedItem} key={book._id}>
            <img
              src={imageSrc}
              alt={book.title}
              className={s.image}
              onError={e => {
                (e.currentTarget as HTMLImageElement).src = notFoundImg2x;
              }}
            />
            <div className={s.infoContainer}>
              <div className={s.info}>
                <p className={s.title}>{book.title}</p>
                <p className={s.author}>{book.author}</p>
              </div>
              {isLibraryPage && (
                <button
                  type="button"
                  className={s.deleteBtn}
                  onClick={() => handleDelete(book._id)}
                >
                  <Icon iconName="icon-delete" className={s.iconDelete} width={28} height={28} />
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RecommendedList;
