import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import CreateLibrary from '../CreateLibrary/CreateLibrary';
import Dashboard from '../Dashboard/Dashboard';
import RecommendedBooks from '../RecommendedBooks/RecommendedBooks';
import s from './MyLibrary.module.css';
import { fetchOwnBooks } from '../../redux/books/operations';
import RecommendedList from '../RecommendedList/RecommendedList';
import { useSelector } from 'react-redux';
import { selectOwnBooks } from '../../redux/books/selectors';
import CustomSelect from '../CustomSelect/CustomSelect';
import Pagination from '../Pagination/Pagination';
import useMedia from '../../hooks/useMedia';

const MyLibrary = () => {
  const dispatch = useAppDispatch();
  const ownLibrary = useSelector(selectOwnBooks);

  const [page, setPage] = useState<number>(1);
  const { isMobile, isTablet, isDesktop } = useMedia();
  const limit = isMobile ? 2 : isTablet ? 8 : 10;

  useEffect(() => {
    dispatch(fetchOwnBooks());
  }, [dispatch]);

  const totalPages = Math.ceil(ownLibrary.length / limit);
  const paginatedBooks = ownLibrary.slice((page - 1) * limit, page * limit);

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <Dashboard>
        <CreateLibrary />
        <RecommendedBooks />
      </Dashboard>

      <div className={s.library}>
        <div className={s.select}>
          <h1 className={s.title}>My library</h1>
          <CustomSelect />
          <Pagination totalPages={totalPages} handlePageChange={handlePageChange} page={page} />
        </div>
        <RecommendedList results={paginatedBooks} />
      </div>
    </>
  );
};

export default MyLibrary;
