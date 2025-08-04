import * as Yup from 'yup';

export const addReadingSchema = Yup.object().shape({
  page: Yup.string()
    .required('Page number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .transform((value, originalValue) => originalValue.replace(/\s/g, '')),
});
