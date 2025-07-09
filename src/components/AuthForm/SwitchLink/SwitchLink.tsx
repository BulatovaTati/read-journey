import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import s from './SwitchLink.module.css';
import { SwitchLinkProps } from '../auth-types';

const SwitchLink: FC<SwitchLinkProps> = ({ isLoginPage }) => {
  return isLoginPage ? (
    <NavLink to="/register" className={s.linkLogin}>
      Don’t have an account?
    </NavLink>
  ) : (
    <NavLink to="/login" className={s.linkLogin}>
      Already have an account?
    </NavLink>
  );
};

export default SwitchLink;
