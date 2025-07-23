import { useEffect } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { selectOwnBooks } from '../../redux/books/selectors';
import { addNewBook, fetchOwnBooks } from '../../redux/books/operations';

import { schemaCreateLibrary } from '../../validations/createOwnLibraryValidation';
import { useAppDispatch } from '../../redux/hooks';

import s from '../Filter/Filter.module.css';

interface BookFormInputs {
  title: string;
  author: string;
  page: number;
}

interface Book {
  title: string;
  author: string;
  totalPages: number;
}

const CreateLibrary = () => {
  const dispatch = useAppDispatch();
  const ownLibrary = useSelector(selectOwnBooks) as Book[];

  const { register, handleSubmit, reset } = useForm<BookFormInputs>({
    resolver: yupResolver(schemaCreateLibrary),
    shouldFocusError: false,
  });

  useEffect(() => {
    dispatch(fetchOwnBooks());
  }, [dispatch]);

  const onSubmit: SubmitHandler<BookFormInputs> = data => {
    const { title, author, page } = data;

    const exists = ownLibrary.find(book => book.title === title);
    if (exists) {
      toast.error('The book is already in the library');
      return;
    }

    dispatch(addNewBook({ title, author, totalPages: page }));
    reset();
  };

  const onError = (errors: FieldErrors<BookFormInputs>) => {
    toast.error('Please complete all fields correctly');
  };

  return (
    <div>
      <h2 className={s.title}>Filters:</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} className={s.form}>
        <div className={s.inputsWrapper}>
          <div className={s.wrapperInput}>
            <div className={s.labelContainer}>
              <label htmlFor="title" className={s.label}>
                Book title:
              </label>
            </div>
            <input
              id="title"
              {...register('title')}
              className={s.input}
              placeholder="I See You Are Interested In The Dark"
            />
          </div>
          <div className={s.wrapperInput}>
            <div className={s.labelContainer}>
              <label htmlFor="author" className={s.label}>
                The author:
              </label>
            </div>
            <input
              id="author"
              {...register('author')}
              className={s.input}
              placeholder="Hilarion Pavlyuk"
            />
          </div>
          <div className={s.wrapperInput}>
            <div className={s.labelContainer}>
              <label htmlFor="page" className={s.label}>
                Number of pages:
              </label>
            </div>
            <input
              id="page"
              {...register('page')}
              className={s.input}
              type="number"
              placeholder="664"
            />
          </div>
        </div>
        <button type="submit" className={s.btn}>
          Add book
        </button>
      </form>
    </div>
  );
};

export default CreateLibrary;
