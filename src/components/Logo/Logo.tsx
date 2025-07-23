import { Link, useLocation } from 'react-router-dom';
import useMedia from '../../hooks/useMedia';

import s from './Logo.module.css';

const Logo = () => {
  const { pathname } = useLocation();
  const { isTablet, isDesktop } = useMedia();

  const isAuthPage = pathname === '/login' || pathname === '/register';

  const shouldShowSpan = isDesktop || (isTablet && isAuthPage);

  return (
    <Link to="/recommended" className={s.logo}>
      <svg width={42} height={17}>
        <use href="/favicon.svg"></use>
      </svg>
      {shouldShowSpan && <span>read journey</span>}
    </Link>
  );
};

export default Logo;
