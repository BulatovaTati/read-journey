import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../Loader/Loader';
import Dashboard from '../Dashboard/Dashboard';
import AddReading from '../AddReading/AddReading';
import ReadingDetails from '../ReadingDetails/ReadingDetails';
import TimeLeft from './TimeLeft/TimeLeft';
import InfoBlock from './InfoBlock/InfoBlock';
import StatisticNone from './StatisticNone/StatisticNone';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectInfoCurrentBook, selectIsLoading } from '../../redux/books/selectors';
import { fetchBookDetails } from '../../redux/books/operations';

import s from './Reading.module.css';

const Reading = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const selectCurrentBookInfo = useAppSelector(selectInfoCurrentBook);
  const [read, setRead] = useState<boolean>(false);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookDetails(bookId));
    }
  }, [bookId, dispatch]);

  if (!selectCurrentBookInfo) {
    return <Loader />;
  }

  return (
    <>
      {isLoading && <Loader />}
      <Dashboard>
        <AddReading selectedBook={bookId} onReadChange={setRead} />
        <div className={s.statistic}>
          {selectCurrentBookInfo.progress?.length !== 0 ? <ReadingDetails /> : <StatisticNone />}
        </div>
      </Dashboard>
      <div className={s.reading}>
        <div className={s.titleContainer}>
          <h1 className={s.title}>My reading</h1>
          <TimeLeft />
        </div>
        <InfoBlock
          imageUrl={selectCurrentBookInfo.imageUrl}
          title={selectCurrentBookInfo.title}
          author={selectCurrentBookInfo.author}
          isRead={read}
        />
      </div>
    </>
  );
};

export default Reading;
