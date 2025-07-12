import imgBooksDesc from '/images/book-desktop.png';
import imgBooksDesc2x from '/images/book-desktop@2x.png';
import imgBooksMob from '/images/book-mobile.png';
import imgBooksMob2x from '/images/book-desktop@2x.png';

import s from './NoBooksScreen.module.css';

type Props = {
  part: 'Recomended' | 'MyLibraryBooks';
};

const NotFoundBooks = ({ part }: Props) => {
  return (
    <div className={s.container}>
      <picture className={s.picture}>
        <source srcSet={`${imgBooksMob} 1x, ${imgBooksMob2x} 2x`} media="(max-width: 767.98px)" />
        <source srcSet={`${imgBooksDesc} 1x, ${imgBooksDesc2x} 2x`} media="(min-width: 768px)" />
        <img src={imgBooksDesc} alt="stack books" className={s.img} />
      </picture>

      {part === 'Recomended' && (
        <p className={s.message}>
          Oops <span className={s.errorText}>unfortunately</span> nothing was found
        </p>
      )}
      {part === 'MyLibraryBooks' && (
        <p className={s.message}>
          To start training, add <span className={s.errorText}>some of your books</span> or from the
          recommended ones
        </p>
      )}
    </div>
  );
};

export default NotFoundBooks;
