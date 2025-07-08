import { FC, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import Logo from '../Logo/Logo';

import { registerSchema } from '../../validations/registrationFormValidation';
import { loginSchema } from '../../validations/loginFormValidation';
import { useAppDispatch } from '../../redux/hooks';

import { loginUser, registerUser } from '../../redux/auth/operations';
import { Credentials } from '../../redux/auth/auth-types';

import s from './AuthForm.module.css';

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

const AuthForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const formSchema = isLoginPage ? loginSchema : registerSchema;
  const defaultValues: AuthFormData = isLoginPage
    ? { email: '', password: '' }
    : { name: '', email: '', password: '' };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    defaultValues,
  });

  const nameValue = watch('name');
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const isNameValid = !errors.name && !!nameValue;
  const isEmailValid = !!emailValue && !errors.email;
  const isPasswordValid = !errors.password && passwordValue.length >= 7;

  const onSubmit: SubmitHandler<AuthFormData> = async data => {
    try {
      if (isLoginPage) {
        const { email, password } = data;
        await dispatch(loginUser({ email, password })).unwrap();
      } else {
        await dispatch(registerUser(data as Credentials)).unwrap();
      }
      reset();
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleClickShowPassword = () => setShowPassword(prev => !prev);

  return (
    <div className={s.formContainer}>
      <Logo />

      <div className={s.formWrapper}>
        <h2 className={s.title}>
          Expand your mind, reading <span className={s.highlight}>a book</span>
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${s.form} ${isLoginPage ? s.loginPageClass : ''}`}
        >
          <div className={s.inputContainer}>
            {!isLoginPage && (
              <label className={s.labelWrapper}>
                <div
                  className={clsx(s.inputWrapper, {
                    [s.inputError]: errors.name,
                    [s.inputSuccess]: isNameValid,
                  })}
                >
                  <p className={s.labelText}>Name:</p>
                  <input
                    type="text"
                    {...register('name')}
                    className={s.input}
                    placeholder="Ilona Ratushniak"
                  />
                  {errors.name && (
                    <Icon className={clsx(s.iconMessage, s.validationIcon)} iconName="icon-error" />
                  )}
                  {isNameValid && (
                    <Icon
                      className={clsx(s.iconMessage, s.validationIcon)}
                      iconName="icon-success"
                    />
                  )}
                </div>
                {errors.name && <p className={s.errorMessage}>{errors.name?.message}</p>}
              </label>
            )}
            <label className={s.labelWrapper}>
              <div
                className={clsx(s.inputWrapper, {
                  [s.inputError]: errors.email,
                  [s.inputSuccess]: isEmailValid,
                })}
              >
                <p className={s.labelText}>Mail:</p>
                <input
                  type="email"
                  {...register('email')}
                  className={s.input}
                  placeholder="Your@email.com"
                />
                {errors.email && (
                  <Icon className={clsx(s.iconMessage, s.validationIcon)} iconName="icon-error" />
                )}
                {isEmailValid && (
                  <Icon className={clsx(s.iconMessage, s.validationIcon)} iconName="icon-success" />
                )}
              </div>
              {errors.email && <p className={s.errorMessage}>{errors.email?.message}</p>}
            </label>
            <label className={s.labelWrapper}>
              <div
                className={clsx(s.inputWrapper, {
                  [s.inputError]: errors.password,
                  [s.inputSuccess]: isPasswordValid,
                })}
              >
                <p className={s.labelText}>Password:</p>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  autoComplete="on"
                  className={s.input}
                  placeholder="Yourpasswordhere"
                />

                {errors.password && (
                  <Icon className={clsx(s.iconMessage, s.validationIcon)} iconName="icon-error" />
                )}
                {isPasswordValid && (
                  <Icon className={clsx(s.iconMessage, s.validationIcon)} iconName="icon-success" />
                )}
                <button
                  className={`${s.showPasswordBtn} ${
                    isPasswordValid || errors.password ? s.shifted : ''
                  }`}
                  type="button"
                  onClick={handleClickShowPassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Icon className={s.icon} iconName={showPassword ? 'icon-eye-off' : 'icon-eye'} />
                </button>
              </div>

              <div className={s.messageWrapper}>
                {!errors.password && getValues('password') && (
                  <p className={clsx(s.errorMessage, s.successMessage)}>Password is secure</p>
                )}
                {errors.password && <p className={s.errorMessage}>{errors.password.message}</p>}
              </div>
            </label>
          </div>

          <div className={s.btnWrapper}>
            <button type="submit" className={clsx(s.btn, isLoginPage ? s.loginBtn : s.registerBtn)}>
              {isLoginPage ? 'Log in' : 'Registration'}
            </button>

            {isLoginPage ? (
              <NavLink to="/register" className={s.linkLogin}>
                Don’t have an account?
              </NavLink>
            ) : (
              <NavLink to="/login" className={s.linkLogin}>
                Already have an account?
              </NavLink>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
