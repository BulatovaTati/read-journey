import { NavLink } from 'react-router-dom';
import { SwitchLinkProps } from '../auth-types';
import s from './SwitchLink.module.css';

const SwitchLink = ({ isLoginPage }: SwitchLinkProps) => {
  return isLoginPage ? (
    <NavLink to="/register" className={s.linkLogin}>
      Don't have an account?
    </NavLink>
  ) : (
    <NavLink to="/login" className={s.linkLogin}>
      Already have an account?
    </NavLink>
  );
};

export default SwitchLink;
