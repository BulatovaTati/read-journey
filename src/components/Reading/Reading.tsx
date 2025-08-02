import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import { selectInfoCurrentBook, selectOwnBooks } from '../../redux/books/selectors';
import s from './Reading.module.css';
import AddReading from '../AddReading/AddReading';
import ReadingDetails from '../ReadingDetails/ReadingDetails';

const Reading = () => {
  const { bookId } = useParams();
  const books = useSelector(selectOwnBooks);
  const [read, setRead] = useState(false);
  const selectCurrentBookInfo = useSelector(selectInfoCurrentBook);

  const selectedBook = books.find(book => book._id === bookId);
  return (
    <>
      <Dashboard>
        <AddReading />
        <ReadingDetails />
      </Dashboard>

      <div className={s.reading}>
        <div className={s.titleContainer}>
          <h1 className={s.title}>My reading</h1>
        </div>
      </div>
    </>
  );
};

export default Reading;
