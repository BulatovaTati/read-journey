import { calculateTimeLeft } from '../../../helpers/calculateTimeLeft';
import { selectInfoCurrentBook } from '../../../redux/books/selectors';
import { useAppSelector } from '../../../redux/hooks';
import s from './TimeLeft.module.css';

const TimeLeft = () => {
  const book = useAppSelector(selectInfoCurrentBook);

  const timeLeft = book && calculateTimeLeft(book);

  if (!timeLeft) return null;

  if (book.status === 'done') {
    return <p className={s.time}>Finished 🎉</p>;
  }

  if (!book?.progress || book.progress.length === 0) {
    return <p className={s.time}>Haven't started yet ⏳</p>;
  }

  return (
    <p className={s.time}>
      {timeLeft.hours} hours and {timeLeft.minutes} minutes left
    </p>
  );
};

export default TimeLeft;
