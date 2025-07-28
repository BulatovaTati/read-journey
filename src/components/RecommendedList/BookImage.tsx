import notFoundImg2x from '/images/desktop-default-image@2x.jpg';
import s from './RecommendedList.module.css';
import { FC } from 'react';

interface BookImageProps {
  imageSrc: string;
  title: string;
  handleImageClick: () => void;
}

const BookImage: FC<BookImageProps> = ({ imageSrc, title, handleImageClick }) => {
  return (
    <img
      src={imageSrc}
      alt={title}
      className={s.image}
      loading="lazy"
      onClick={handleImageClick}
      onError={e => {
        (e.currentTarget as HTMLImageElement).src = notFoundImg2x;
      }}
    />
  );
};

export default BookImage;
