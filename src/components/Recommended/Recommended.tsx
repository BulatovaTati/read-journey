import Pagination from '../Pagination/Pagination';
import s from './Recommended.module.css';

import Dashboard from '../Dashboard/Dashboard';
import useMedia from '../../hooks/useMedia';
import Quote from '../Quote/Quote';
import Workout from '../Workout/Workout';
import Filter from '../Filter/Filter';

const Recommended = () => {
  const { isDesktop } = useMedia();
  return (
    <>
      <Dashboard>
        <Filter />
        <Workout />
        {isDesktop && <Quote />}
      </Dashboard>
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
