import Icon from '../Icon/Icon';
import LogoutButton from '../LogoutButton/LogoutButton';
import UserNav from '../UserNav/UserNav';
import s from './MobileMenu.module.css';

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

const MobileMenu = ({ onClose, isOpen }: MobileMenuProps) => {
  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={`${s.mobileMenu} ${isOpen ? s.open : ''}`}>
        <button type="button" className={s.closeBtn} onClick={onClose}>
          <Icon iconName="icon-x" className={s.iconClose} />
        </button>
        <UserNav onClick={onClose} />
        <LogoutButton />
      </div>
    </div>
  );
};

export default MobileMenu;
