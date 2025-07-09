import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import s from './UserNav.module.css';

interface UserNavProps {
  onClick?: () => void;
}

const UserNav = ({ onClick }: UserNavProps) => {
  return (
    <nav className={s.navigation}>
      <ul className={s.navList}>
        <li>
          <NavLink
            to="/recommended"
            onClick={onClick}
            className={({ isActive }) => clsx(s.link, isActive && s.active)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/library"
            onClick={onClick}
            className={({ isActive }) => clsx(s.link, isActive && s.active)}
          >
            My library
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default UserNav;
