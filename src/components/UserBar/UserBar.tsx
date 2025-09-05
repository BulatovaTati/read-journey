import LogoutButton from '../LogoutButton/LogoutButton';
import Icon from '../Icon/Icon';

import { selectUserName } from '../../redux/auth/selectors';
import useMedia from '../../hooks/useMedia';
import { useAppSelector } from '../../redux/hooks';

import s from './UserBar.module.css';

interface UserBarProps {
  onMenuClick?: () => void;
}

const UserBar = ({ onMenuClick }: UserBarProps) => {
  const name = useAppSelector(selectUserName);
  const { isMobile } = useMedia();

  const firstLetterAvatar = name?.slice(0, 1).toUpperCase();

  return (
    <div className={s.userBar}>
      <div className={s.avatar}>{firstLetterAvatar}</div>
      <p className={s.name}>{name}</p>
      {isMobile ? (
        <button type="button" className={s.mobileMenuButton} onClick={onMenuClick}>
          <Icon iconName="icon-menu" className={s.mobileMenuIcon} />
        </button>
      ) : (
        <LogoutButton />
      )}
    </div>
  );
};

export default UserBar;
