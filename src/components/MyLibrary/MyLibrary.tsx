import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import CreateLibrary from '../CreateLibrary/CreateLibrary';
import Dashboard from '../Dashboard/Dashboard';
import RecommendedBooks from '../RecommendedBooks/RecommendedBooks';
import s from './MyLibrary.module.css';
import { fetchOwnBooks } from '../../redux/books/operations';
import RecommendedList from '../RecommendedList/RecommendedList';
import { useSelector } from 'react-redux';
import { selectOwnBooks } from '../../redux/books/selectors';

const MyLibrary = () => {
  const dispatch = useAppDispatch();
  const ownLibrary = useSelector(selectOwnBooks);

  useEffect(() => {
    dispatch(fetchOwnBooks());
  }, [dispatch]);

  return (
    <>
      <Dashboard>
        <CreateLibrary />
        <RecommendedBooks />
      </Dashboard>

      <div className={s.library}>
        <h1 className={s.title}>My library</h1>
        <RecommendedList results={ownLibrary} />
      </div>
    </>
  );
};

export default MyLibrary;
