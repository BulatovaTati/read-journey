import { useSelector } from 'react-redux';
import { selectInfoCurrentBook } from '../../../redux/books/selectors';
import s from './TimeLeft.module.css';

const TimeLeft = () => {
  const book = useSelector(selectInfoCurrentBook);

  return (
    <>
      {book?.timeLeftToRead?.minutes && (
        <p className={s.time}>
          {book.timeLeftToRead.hours} hours and {book.timeLeftToRead.minutes} minutes left
        </p>
      )}
    </>
  );
};

export default TimeLeft;
