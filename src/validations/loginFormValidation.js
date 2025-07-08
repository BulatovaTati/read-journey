import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(7, 'Enter a valid Password* at least 7 characters')
    .required('Password is required'),
});
