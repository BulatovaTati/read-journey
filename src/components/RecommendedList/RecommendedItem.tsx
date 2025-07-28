import { FC } from 'react';
import { Book } from '../../redux/books/books-types';
import notFoundImg2x from '/images/desktop-default-image@2x.jpg';

import BookImage from './BookImage';
import DeleteBtn from './DeleteBtn';

import s from './RecommendedList.module.css';

interface RecommendedItemProps {
  book: Book;
  isLibraryPage: boolean;
  onImageClick: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

const RecommendedItem: FC<RecommendedItemProps> = ({
  book,
  isLibraryPage,
  onImageClick,
  onDelete,
}) => {
  const imageSrc = book.imageUrl || notFoundImg2x;

  return (
    <li className={s.recommendedItem}>
      <BookImage
        imageSrc={imageSrc}
        title={book.title}
        handleImageClick={() => onImageClick(book)}
      />
      <div className={s.infoContainer}>
        <div className={s.info}>
          <p className={s.title}>{book.title}</p>
          <p className={s.author}>{book.author}</p>
        </div>
        {isLibraryPage && <DeleteBtn onClick={() => onDelete(book._id)} />}
      </div>
    </li>
  );
};

export default RecommendedItem;
