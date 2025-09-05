import { useState } from 'react';

import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import UserNav from '../UserNav/UserNav';
import UserBar from '../UserBar/UserBar';
import MobileMenu from '../MobileMenu/MobileMenu';

import useMedia from '../../hooks/useMedia';

import s from './Header.module.css';

const Header = () => {
  const { isMobile } = useMedia();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerContainer}>
          <Logo />
          {isMobile ? (
            <>
              <UserBar onMenuClick={toggleMenu} />
              {isMenuOpen && <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />}
            </>
          ) : (
            <>
              <UserNav />
              <UserBar />
            </>
          )}
        </div>
      </Container>
    </header>
  );
};
export default Header;
