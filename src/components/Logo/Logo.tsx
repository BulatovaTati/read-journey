import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <>
      <Link to="/">
        <svg width={42} height={17}>
          <use href="/favicon.svg"></use>
        </svg>
      </Link>
    </>
  );
};

export default Logo;
