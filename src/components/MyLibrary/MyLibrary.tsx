import CreateLibrary from '../CreateLibrary/CreateLibrary';
import Dashboard from '../Dashboard/Dashboard';
import RecommendedBooks from '../RecommendedBooks/RecommendedBooks';
import s from './MyLibrary.module.css';

const MyLibrary = () => {
  return (
    <>
      <Dashboard>
        <CreateLibrary />
        <RecommendedBooks />
      </Dashboard>

      <div className={s.library}>
        <h1 className={s.title}>My library</h1>
      </div>
    </>
  );
};

export default MyLibrary;
