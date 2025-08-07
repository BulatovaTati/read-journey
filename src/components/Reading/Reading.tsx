import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import AddReading from '../AddReading/AddReading';
import ReadingDetails from '../ReadingDetails/ReadingDetails';
import InfoBlock from './InfoBlock';
import StatisticNone from './StatisticNone';
import Loader from '../Loader/Loader';

import { useAppDispatch } from '../../redux/hooks';
import { selectInfoCurrentBook, selectIsLoading } from '../../redux/books/selectors';
import { fetchBookDetails } from '../../redux/books/operations';
import { RootState } from '../../redux/store';
import { Book } from '../../redux/books/books-types';

import s from './Reading.module.css';

interface RouteParams {
  [key: string]: string | undefined;
  bookId?: string;
}

const Reading = () => {
  const { bookId } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const [read, setRead] = useState<boolean>(false);
  const isLoading = useSelector(selectIsLoading);

  const selectCurrentBookInfo = useSelector<RootState, Book | null>(selectInfoCurrentBook);
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
        <div>
          {selectCurrentBookInfo.progress?.length !== 0 ? <ReadingDetails /> : <StatisticNone />}
        </div>
      </Dashboard>
      <div className={s.reading}>
        <div className={s.titleContainer}>
          <h1 className={s.title}>My reading</h1>
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
