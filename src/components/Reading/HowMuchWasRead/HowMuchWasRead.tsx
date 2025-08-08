import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Loader from '../../Loader/Loader';
import { deleteReadingRecord, fetchBookDetails } from '../../../redux/books/operations';
import { useAppDispatch } from '../../../redux/hooks';
import { selectIsLoading } from '../../../redux/books/selectors';
import Icon from '../../Icon/Icon';
import s from './HowMuchWasRead.module.css';

interface HowMuchWasReadProps {
  timeReading: {
    readId: string;
    percent: number;
    minutes: number;
    pages: number;
  };
}

const HowMuchWasRead: FC<HowMuchWasReadProps> = ({ timeReading }) => {
  const dispatch = useAppDispatch();
  const { bookId } = useParams<{ bookId: string }>();
  const isLoading = useSelector(selectIsLoading);

  const handleDelete = () => {
    if (!bookId) return;

    dispatch(deleteReadingRecord({ bookId, readingId: timeReading.readId }))
      .unwrap()
      .then(() => dispatch(fetchBookDetails(bookId)))
      .catch(error => console.error('Error deleting:', error));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <li className={s.item} key={timeReading.readId}>
      <div>
        <p>{timeReading.percent}%</p>
        <span>{timeReading.minutes} minutes</span>
      </div>
      <div>
        <div>
          <Icon iconName="icon-block" className={s.graph} />
          <button onClick={handleDelete}>
            <RiDeleteBin5Line />
          </button>
        </div>
        <span>{timeReading.pages + 1} pages per hour</span>
      </div>
    </li>
  );
};

export default HowMuchWasRead;
