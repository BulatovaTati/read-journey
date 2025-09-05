import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import Loader from '../../Loader/Loader';
import Icon from '../../Icon/Icon';

import { deleteReadingRecord, fetchBookDetails } from '../../../redux/books/operations';
import { useAppDispatch } from '../../../redux/hooks';
import { selectIsLoading } from '../../../redux/books/selectors';

import s from './HowMuchWasRead.module.css';

interface HowMuchWasReadProps {
  timeReading: {
    readId: string;
    percent: number;
    minutes: number;
    pages: number;
  };
}

const HowMuchWasRead = ({ timeReading }: HowMuchWasReadProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsLoading);
  const { bookId } = useParams<{ bookId: string }>();

  const handleDelete = async () => {
    if (!bookId) return;

    try {
      dispatch(deleteReadingRecord({ bookId, readingId: timeReading.readId })).unwrap();
      dispatch(fetchBookDetails(bookId));
    } catch (err: unknown) {
      const error = err as { message?: string } | string;
      const message = typeof error === 'string' ? error : error?.message || 'Error deleting record';

      if (message.includes("haven't finished reading") || message.includes('409')) {
        toast.error('You can delete this record only after finishing the book.');
      } else {
        toast.error(message);
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <li className={s.item} key={timeReading.readId}>
      <div className={s.itemContainer}>
        <p className={s.percent}>{timeReading.percent}%</p>
        <span className={s.minutes}>{timeReading.minutes} minutes</span>
      </div>
      <div>
        <div className={s.graphContainer}>
          <Icon iconName="icon-block" className={s.graph} />
          <button onClick={handleDelete} className={s.btn}>
            <Icon iconName="icon-trash" className={s.trash} />
          </button>
        </div>
        <span className={s.perHour}>{timeReading.pages + 1} pages per hour</span>
      </div>
    </li>
  );
};

export default HowMuchWasRead;
