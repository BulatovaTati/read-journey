import { Link } from 'react-router-dom';
import s from './Workout.module.css';
import Icon from '../Icon/Icon';

const Workout = () => {
  return (
    <div className={s.sectionWorkout}>
      <h3 className={s.title}>Start your workout</h3>
      <ul className={s.list}>
        <li className={s.listItem}>
          <p className={s.number}>1</p>
          <p className={s.text}>
            <span className={s.textTitle}>Create a personal library:</span>
            add the books you intend to read to it.
          </p>
        </li>
        <li className={s.listItem}>
          <p className={s.number}>2</p>
          <p className={s.text}>
            <span className={s.textTitle}>Create your first workout:</span>
            define a goal, choose a period, start training.
          </p>
        </li>
      </ul>
      <Link to="/library" className={s.link}>
        My library
        <Icon iconName="icon-arrow" className={s.icon} width="24" height="24" />
      </Link>
    </div>
  );
};

export default Workout;
