import { FC } from 'react';
import { Book } from '../../redux/books/books-types';
import s from './RecommendedBooksList.module.css';
import { useModalContext } from '../../context/ModalContext';

interface RecommendedBooksListProps {
  results: Book[];
}

const RecommendedBooksList: FC<RecommendedBooksListProps> = ({ results }) => {
  const { openModal } = useModalContext();

  const handleClick = (book: Book) => {
    openModal('bookInfo', {
      bookId: book._id,
      title: book.title,
      author: book.author,
      totalPages: book.totalPages,
      imageUrl: book.imageUrl,
    });
  };

  return (
    <ul className={s.list}>
      {results?.slice(0, 3).map(book => (
        <li className={s.item} key={book._id} onClick={() => handleClick(book)}>
          <img src={book.imageUrl} alt={book.title} className={s.image} />
          <p className={s.title}>{book.title}</p>
          <p className={s.author}>{book.author}</p>
        </li>
      ))}
    </ul>
  );
};

export default RecommendedBooksList;
