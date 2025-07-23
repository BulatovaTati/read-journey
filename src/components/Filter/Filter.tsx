import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../redux/hooks';
import { fetchRecommendedBooks } from '../../redux/books/operations';

import s from './Filter.module.css';

interface FiltersFormInputs {
  title?: string;
  author?: string;
}

const Filters: FC = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset, watch } = useForm<FiltersFormInputs>({
    defaultValues: {
      title: '',
      author: '',
    },
  });

  const onSubmit: SubmitHandler<FiltersFormInputs> = data => {
    const { title = '', author = '' } = data;

    if (!title.trim() || !author.trim()) {
      return toast.error('Complete at least one field of the form');
    }

    dispatch(fetchRecommendedBooks({ title, author }));
  };

  const handleReset = () => {
    reset();
    dispatch(fetchRecommendedBooks({ page: 1, limit: 10 }));
  };

  const title = watch('title');
  const author = watch('author');

  return (
    <div>
      <h3 className={s.title}>Filters:</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
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
              type="text"
              className={s.input}
              placeholder="Enter text"
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
              type="text"
              className={s.input}
              placeholder="Enter text"
            />
          </div>
        </div>

        <div className={s.buttonGroup}>
          <button type="submit" className={s.btn} aria-label="To apply">
            To apply
          </button>
          {(title || author) && (
            <button type="button" onClick={handleReset} className={s.btn} aria-label="Reset">
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Filters;
