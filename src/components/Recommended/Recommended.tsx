import Pagination from '../Pagination/Pagination';
import s from './Recommended.module.css';

import Dashboard from '../Dashboard/Dashboard';

const Recommended = () => {
  return (
    <>
      <Dashboard />
      <div className={s.recommended}>
        <div className={s.pagination}>
          <h1 className={s.title}>Recommended</h1>
          {/* <Pagination /> */}
        </div>
      </div>
    </>
  );
};

export default Recommended;
