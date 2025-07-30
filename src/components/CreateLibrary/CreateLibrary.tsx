import { useEffect } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { selectOwnBooks } from '../../redux/books/selectors';
import { addNewBook, fetchOwnBooks } from '../../redux/books/operations';

import { schemaCreateLibrary } from '../../validations/createOwnLibraryValidation';
import { useAppDispatch } from '../../redux/hooks';
import { useModalContext } from '../../context/ModalContext';

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
  const { openModal } = useModalContext();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<BookFormInputs>({
    resolver: yupResolver(schemaCreateLibrary),
    mode: 'onChange',
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
    try {
      dispatch(addNewBook({ title, author, totalPages: page })).unwrap();
      reset();
      openModal('addedToLibrary');
    } catch (error) {
      toast.error('Failed to add the book. Please try again.');
    }
  };

  const onError = (errors: FieldErrors<BookFormInputs>) => {
    toast.error('Please complete all fields correctly');
  };

  return (
    <div>
      <h2 className={s.title}>Create your library:</h2>
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
            {errors.title && <p className={s.error}>{errors.title.message}</p>}
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
            {errors.author && <p className={s.error}>{errors.author.message}</p>}
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
              type="text"
              placeholder="664"
            />
            {errors.page && <p className={s.error}>{errors.page.message}</p>}
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
