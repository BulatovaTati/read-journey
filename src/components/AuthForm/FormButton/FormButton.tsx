import { FC } from 'react';
import clsx from 'clsx';

import { FormButtonProps } from '../auth-types';
import s from './FormButton.module.css';

const FormButton: FC<FormButtonProps> = ({ isLogin, type = 'submit' }) => {
  return (
    <button type={type} className={clsx(s.btn, isLogin ? s.loginBtn : s.registerBtn)}>
      {isLogin ? 'Log in' : 'Registration'}
    </button>
  );
};

export default FormButton;
