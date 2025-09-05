import clsx from 'clsx';
import { FormButtonProps } from '../auth-types';
import s from './FormButton.module.css';

const FormButton = ({ isLogin, type = 'submit' }: FormButtonProps) => {
  return (
    <button type={type} className={clsx(s.btn, isLogin ? s.loginBtn : s.registerBtn)}>
      {isLogin ? 'Log in' : 'Registration'}
    </button>
  );
};

export default FormButton;
