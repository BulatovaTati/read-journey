import * as Yup from 'yup';

export const registerSchema = Yup.object({
  name: Yup.string().min(2, 'The name must have at least 2 letters').required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
});
