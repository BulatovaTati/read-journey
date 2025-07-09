import Icon from '../Icon/Icon';
import LogoutButton from '../LogoutButton/LogoutButton';
import UserNav from '../UserNav/UserNav';
import s from './MobileMenu.module.css';

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.mobileMenu}>
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
