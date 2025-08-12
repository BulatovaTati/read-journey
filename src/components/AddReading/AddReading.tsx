import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../redux/hooks';
import { selectInfoCurrentBook, selectReadBook } from '../../redux/books/selectors';
import { fetchBookDetails, readingStart, readingStop } from '../../redux/books/operations';
import { addReadingSchema } from '../../validations/addReadingValidation';
import s from './AddReading.module.css';
import { ReadingRecord } from '../../redux/books/books-types';
import { useModalContext } from '../../context/ModalContext';
import IsReadBookModal from '../Modals/IsReadBookModal/IsReadBookModal';

interface AddReadingProps {
  selectedBook: string | undefined;
  onReadChange: (isReading: boolean) => void;
}

interface FormValues {
  page: string;
}

const AddReading: FC<AddReadingProps> = ({ selectedBook, onReadChange }) => {
  const dispatch = useAppDispatch();
  const infoAboutBook = useSelector(selectInfoCurrentBook);
  const { openModal, modalType, isOpen, closeModal } = useModalContext();
  const readBook = useSelector(selectReadBook);
  const [read, setRead] = useState<boolean>(false);
  const [pageError, setPageError] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
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

  const onSubmit: SubmitHandler<FormValues> = data => {
    const pageNumber = parseInt(data.page, 10);

    if (!infoAboutBook) return;

    if (pageNumber > infoAboutBook.totalPages) {
      setPageError(`Page number must not exceed ${infoAboutBook.totalPages}`);
      return;
    } else {
      setPageError('');
    }

    const requestData = {
      id: selectedBook!,
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

      if (pageNumber === infoAboutBook.totalPages) {
        openModal('readBook');
      }

      setValue('page', String(pageNumber));
    }
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
            type="number"
            min="1"
            max={infoAboutBook?.totalPages || undefined}
            className={`${s.input} ${errors.page || pageError ? s.inputError : ''}`}
            {...register('page')}
          />

          {errors.page && <p className={s.error}>{errors.page.message}</p>}
          {pageError && <p className={s.error}>{pageError}</p>}
        </div>
        <button type="submit" className={s.button} disabled={!!pageError}>
          {read ? 'To stop' : 'To start'}
        </button>
      </form>
      {modalType === 'readBook' && <IsReadBookModal isOpen={isOpen} onClose={closeModal} />}
    </div>
  );
};

export default AddReading;
