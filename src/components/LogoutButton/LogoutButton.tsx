import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { useAppDispatch } from '../../redux/hooks';
import { logOutUser } from '../../redux/auth/operations';
import { selectIsLoading } from '../../redux/auth/selectors';
import s from './LogoutButton.module.css';

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  if (isLoading) return <Loader />;

  return (
    <button onClick={handleLogout} className={s.logoutBtn}>
      Log out
    </button>
  );
};

export default LogoutButton;
