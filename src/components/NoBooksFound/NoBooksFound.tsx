import { useLocation } from 'react-router-dom';
import imgBooksDesktop1x from '/images/book-desktop.png';
import imgBooksDesktop2x from '/images/book-desktop@2x.png';
import imgBooksMobile1x from '/images/book-mobile.png';
import imgBooksMobile2x from '/images/book-mobile@2x.png';
import s from './NoBooksFound.module.css';

const NoBooksFound = () => {
  const { pathname } = useLocation();

  const isRecommended = pathname.includes('recommended');
  const isLibrary = pathname.includes('library');

  return (
    <div className={s.errorContainer}>
      <picture className={s.picture}>
        <source
          srcSet={`${imgBooksMobile1x} 1x, ${imgBooksMobile2x} 2x`}
          media="(max-width: 767px)"
        />
        <source
          srcSet={`${imgBooksDesktop1x} 1x, ${imgBooksDesktop2x} 2x`}
          media="(min-width: 766px)"
        />
        <img className={s.image} src={imgBooksDesktop1x} alt="stack books" loading="lazy" />
      </picture>

      {isRecommended && (
        <p className={s.errorTest}>
          Oops <span className={s.errorAccent}>unfortunately</span> nothing was found
        </p>
      )}
      {isLibrary && (
        <p className={s.errorTest}>
          To start training, add <span className={s.errorAccent}>some of your books</span> or from
          the recommended ones
        </p>
      )}
    </div>
  );
};

export default NoBooksFound;
