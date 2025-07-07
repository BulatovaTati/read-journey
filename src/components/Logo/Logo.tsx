import { Link } from 'react-router-dom';
import s from './Logo.module.css';

const Logo = () => {
  return (
    <>
      <Link className={s.logo} to="/">
        <svg width={42} height={17}>
          <use href="/favicon.svg"></use>
        </svg>
        read journey
      </Link>
    </>
  );
};

export default Logo;
