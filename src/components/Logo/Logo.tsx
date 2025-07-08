import { Link } from 'react-router-dom';
import s from './Logo.module.css';
import useMedia from '../../hooks/useMedia';

const Logo = () => {
  const { isTablet } = useMedia();
  return (
    <>
      <Link className={s.logo} to="/">
        <svg width={42} height={17}>
          <use href="/favicon.svg"></use>
        </svg>
        {isTablet && <span>read journey</span>}
      </Link>
    </>
  );
};

export default Logo;
