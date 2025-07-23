import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';

import Logo from '../Logo/Logo';
import InputField from './InputField/InputField';
import FormButton from './FormButton/FormButton';
import SwitchLink from './SwitchLink/SwitchLink';

import { registerSchema } from '../../validations/registrationFormValidation';
import { loginSchema } from '../../validations/loginFormValidation';

import { useAppDispatch } from '../../redux/hooks';
import { loginUser, registerUser } from '../../redux/auth/operations';
import { Credentials } from '../../redux/auth/auth-types';
import { AuthFormData } from './auth-types';

import s from './AuthForm.module.css';
import useMedia from '../../hooks/useMedia';

const AuthForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isTablet } = useMedia();
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
      <div className={s.logo}>
        <Logo />
      </div>
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
              <InputField
                type="text"
                label="Name"
                placeholder="Ilona Ratushniak"
                register={register}
                name="name"
                error={errors.name?.message}
                isValid={isNameValid}
              />
            )}
            <InputField
              type="email"
              label="Mail"
              placeholder="Your@email.com"
              register={register}
              name="email"
              error={errors.email?.message}
              isValid={isEmailValid}
            />
            <InputField
              type="password"
              label="Password"
              placeholder="Yourpasswordhere"
              register={register}
              name="password"
              error={errors.password?.message}
              isValid={isPasswordValid}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={handleClickShowPassword}
              successMessage={
                getValues('password') && !errors.password ? 'Password is secure' : undefined
              }
            />
          </div>
          <div className={s.btnWrapper}>
            <FormButton isLogin={isLoginPage} />
            <SwitchLink isLoginPage={isLoginPage} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
