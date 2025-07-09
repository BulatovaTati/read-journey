export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

export interface InputFieldProps {
  type: string;
  label: string;
  placeholder: string;
  register: any;
  name: 'name' | 'email' | 'password';
  error?: string;
  isValid?: boolean;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  successMessage?: string;
}

export interface FormButtonProps {
  isLogin: boolean;
  type?: 'submit' | 'button';
}

export interface SwitchLinkProps {
  isLoginPage: boolean;
}
