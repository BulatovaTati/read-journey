import CreateLibrary from '../CreateLibrary/CreateLibrary';
import Dashboard from '../Dashboard/Dashboard';
import RecommendedBooks from '../RecommendedBooks/RecommendedBooks';
import RecommendedList from '../RecommendedList/RecommendedList';

import CustomSelect from '../CustomSelect/CustomSelect';
import Pagination from '../Pagination/Pagination';
import { useLibraryBooks } from '../../hooks/useLibraryBooks';

import s from './MyLibrary.module.css';

const MyLibrary = () => {
  const { paginatedBooks, page, totalPages, handlePageChange } = useLibraryBooks();

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
