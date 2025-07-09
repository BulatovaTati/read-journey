import { FC } from 'react';
import clsx from 'clsx';
import Icon from '../../Icon/Icon';

import { InputFieldProps } from '../auth-types';
import s from './InputField.module.css';

const InputField: FC<InputFieldProps> = ({
  type,
  label,
  placeholder,
  register,
  name,
  error,
  isValid,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
  successMessage,
}) => {
  return (
    <label className={s.labelWrapper}>
      <div
        className={clsx(s.inputWrapper, {
          [s.inputError]: error,
          [s.inputSuccess]: isValid,
        })}
      >
        <p className={s.labelText}>{label}:</p>
        <input
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          {...register(name)}
          className={s.input}
          placeholder={placeholder}
          autoComplete={name === 'password' ? 'on' : 'off'}
        />

        {error && <Icon className={clsx(s.iconMessage, s.validationIcon)} iconName="icon-error" />}
        {isValid && (
          <Icon className={clsx(s.iconMessage, s.validationIcon)} iconName="icon-success" />
        )}

        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className={`${s.showPasswordBtn} ${isValid || error ? s.shifted : ''}`}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon className={s.icon} iconName={showPassword ? 'icon-eye-off' : 'icon-eye'} />
          </button>
        )}
      </div>

      <div className={s.messageWrapper}>
        {!error && successMessage && (
          <p className={clsx(s.errorMessage, s.successMessage)}>{successMessage}</p>
        )}
        {error && <p className={s.errorMessage}>{error}</p>}
      </div>
    </label>
  );
};

export default InputField;
