import * as Yup from 'yup';

export const schemaCreateLibrary = Yup.object().shape({
  title: Yup.string().min(2).required('title is required'),
  author: Yup.string().min(2).required('author is required'),
  page: Yup.number()
    .typeError('page must be a number')
    .positive('page must be greater than zero')
    .integer('page must be a number')
    .required('number of pages is required'),
});
