import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <Container>
        <Logo /> Header
      </Container>
    </header>
  );
};

export default Header;
