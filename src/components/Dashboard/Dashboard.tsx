import Workout from '../Workout/Workout';
import Quote from '../Quote/Quote';
import Filter from '../Filter/Filter';
import s from './Dashboard.module.css';
import useMedia from '../../hooks/useMedia';

const Dashboard = () => {
  const { isDesktop } = useMedia();
  return (
    <div className={s.dashboard}>
      <Filter />
      <Workout />
      {isDesktop && <Quote />}
    </div>
  );
};

export default Dashboard;
