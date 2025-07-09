import { useState } from 'react';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import UserNav from '../UserNav/UserNav';
import UserBar from '../UserBar/UserBar';
import useMedia from '../../hooks/useMedia';
import MobileMenu from '../MobileMenu/MobileMenu';

import s from './Header.module.css';

const Header = () => {
  const { isMobile, isDesktop } = useMedia();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={s.header}>
      <Container modClass={s.headerContainer}>
        <div className={s.logo}>
          <Logo />
          {isDesktop && <span>read journey</span>}
        </div>
        {isMobile ? (
          <>
            <UserBar onMenuClick={toggleMenu} />
            {isMenuOpen && <MobileMenu onClose={closeMenu} />}
          </>
        ) : (
          <>
            <UserNav />
            <UserBar />
          </>
        )}
      </Container>
    </header>
  );
};
export default Header;
