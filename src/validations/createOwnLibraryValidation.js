import * as Yup from 'yup';

export const schemaCreateLibrary = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  page: Yup.number()
    .typeError('Must be a number')
    .positive('Page must be positive')
    .integer('Must be an integer')
    .required('Page number is required'),
});
