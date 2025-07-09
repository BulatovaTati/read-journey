import { useAppDispatch } from '../../redux/hooks';
import { logOutUser } from '../../redux/auth/operations';
import s from './LogoutButton.module.css';

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <button onClick={handleLogout} className={s.logoutBtn}>
      Log out
    </button>
  );
};

export default LogoutButton;
