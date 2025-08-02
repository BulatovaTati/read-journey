import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import s from './AddReading.module.css';
import { useAppDispatch } from '../../redux/hooks';
import { selectInfoCurrentBook, selectReadBook } from '../../redux/books/selectors';
import { fetchBookDetails, readingStart, readingStop } from '../../redux/books/operations';

const addReadingSchema = Yup.object().shape({
  page: Yup.string()
    .required('Page number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .transform((value, originalValue) => originalValue.replace(/\s/g, '')),
});

const AddReading = ({ selectedBook, onReadChange }) => {
  const dispatch = useAppDispatch();
  const infoAboutBook = useSelector(selectInfoCurrentBook);
  const readBook = useSelector(selectReadBook);
  const [read, setRead] = useState(false);
  const [pageError, setPageError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addReadingSchema),
    defaultValues: {
      page: '',
    },
  });

  useEffect(() => {
    if (selectedBook) {
      dispatch(fetchBookDetails(selectedBook));
    }
  }, [selectedBook, dispatch, readBook]);

  const onSubmit = data => {
    const pageNumber = parseInt(data.page, 10);

    if (pageNumber > infoAboutBook.totalPages) {
      setPageError(`Page number must not exceed ${infoAboutBook.totalPages}`);
      return;
    } else {
      setPageError('');
    }

    const requestData = {
      id: selectedBook,
      page: data.page,
    };

    if (!read) {
      dispatch(readingStart(requestData));
      setRead(true);
      onReadChange(true);
    } else {
      dispatch(readingStop(requestData));
      setRead(false);
      onReadChange(false);
    }

    reset();
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>{!read ? 'Start page' : 'Stop page'}:</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.wrapperInput}>
          <div className={s.labelContainer}>
            <label htmlFor="page" className={s.label}>
              Page number:
            </label>
          </div>
          <input
            id="page"
            type="text"
            placeholder="0"
            className={`${s.input} ${errors.page || pageError ? s.inputError : ''}`}
            {...register('page')}
            onChange={e => {
              const value = e.target.value;
              setValue('page', value);
              if (parseInt(value, 10) > infoAboutBook.totalPages && !isNaN(value) && value !== '') {
                setPageError(`Page number must not exceed ${infoAboutBook.totalPages}`);
              } else {
                setPageError('');
              }
            }}
          />
          {errors.page && <p className={s.error}>{errors.page.message}</p>}
          {pageError && <p className={s.error}>{pageError}</p>}
        </div>
        <button type="submit" className={s.button} disabled={!!pageError}>
          {read ? 'To stop' : 'To start'}
        </button>
      </form>
    </div>
  );
};

export default AddReading;
