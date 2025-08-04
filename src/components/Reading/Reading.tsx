import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import AddReading from '../AddReading/AddReading';
import ReadingDetails from '../ReadingDetails/ReadingDetails';
import { selectInfoCurrentBook } from '../../redux/books/selectors';
import { useAppDispatch } from '../../redux/hooks';
import { fetchBookDetails } from '../../redux/books/operations';
import s from './Reading.module.css';
import Icon from '../Icon/Icon';
import { Book } from '../../redux/books/books-types';
import { RootState } from '../../redux/store';

interface RouteParams {
  [key: string]: string | undefined;
  bookId?: string;
}

const Reading = () => {
  const { bookId } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const [read, setRead] = useState<boolean>(false);
  const selectCurrentBookInfo = useSelector<RootState, Book | null>(selectInfoCurrentBook);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookDetails(bookId));
    }
  }, [bookId, dispatch]);

  if (!selectCurrentBookInfo) {
    return <div>Loading book details...</div>;
  }

  return (
    <>
      <Dashboard>
        <AddReading selectedBook={bookId} onReadChange={setRead} />
        <ReadingDetails />
      </Dashboard>

      <div className={s.reading}>
        <div className={s.titleContainer}>
          <h1 className={s.title}>My reading</h1>
        </div>
        <img src={selectCurrentBookInfo.imageUrl} />
        <p className={s.title}>{selectCurrentBookInfo.title}</p>
        <p className={s.author}>{selectCurrentBookInfo.author}</p>
        {read ? <Icon iconName="icon-play" /> : <Icon iconName="icon-pause" />}
      </div>
    </>
  );
};

export default Reading;
