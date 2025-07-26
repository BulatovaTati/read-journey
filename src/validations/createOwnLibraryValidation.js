import * as Yup from 'yup';

export const schemaCreateLibrary = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  page: Yup.number()
    .typeError('Page must be a number')
    .positive('Page must be greater than zero')
    .integer('Page must be a number')
    .required('Number of pages is required'),
});
