import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

import IsReadBookModal from '../Modals/IsReadBookModal/IsReadBookModal';
import { selectInfoCurrentBook, selectReadBook } from '../../redux/books/selectors';
import { fetchBookDetails, readingStart, readingStop } from '../../redux/books/operations';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addReadingSchema } from '../../validations/addReadingValidation';
import { useModalContext } from '../../context/ModalContext';

import s from './AddReading.module.css';

interface AddReadingProps {
  selectedBook: string | undefined;
  onReadChange: (isReading: boolean) => void;
}

interface FormValues {
  page: string;
}

const AddReading = ({ selectedBook, onReadChange }: AddReadingProps) => {
  const dispatch = useAppDispatch();
  const infoAboutBook = useAppSelector(selectInfoCurrentBook);
  const readBook = useAppSelector(selectReadBook);
  const { openModal, modalType, isOpen, closeModal } = useModalContext();
  const [pageError, setPageError] = useState<string>('');
  const isReading = infoAboutBook?.progress?.some(p => p.status === 'active');

  const {
    register,
    handleSubmit,
    setValue,
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
    if (!infoAboutBook || !selectedBook) return;

    const pageNumber = parseInt(data.page, 10);

    if (pageNumber > infoAboutBook.totalPages) {
      setPageError(`Page number must not exceed ${infoAboutBook.totalPages}`);
      return;
    } else {
      setPageError('');
    }

    if (!isReading) {
      if (infoAboutBook.status === 'done') {
        toast.error('This book is already read.');
        return;
      }

      const requestData = {
        id: selectedBook,
        page: pageNumber,
      };

      dispatch(readingStart(requestData))
        .unwrap()
        .then(() => {
          onReadChange(true);
          toast.success('You started reading this book!');
        })
        .catch(err => toast.error(err || 'Error starting reading'));
    } else {
      const activeRecord = readBook.find(r => r._id === selectedBook && !r.endDate);
      if (!activeRecord) return;

      const requestData = {
        id: selectedBook,
        page: pageNumber,
      };

      dispatch(readingStop(requestData))
        .unwrap()
        .then(() => {
          onReadChange(false);
          toast.success('You stopped reading this book.');

          if (pageNumber === infoAboutBook.totalPages) {
            openModal('readBook');
          }
        })
        .catch(err => toast.error(err || 'Error stopping reading'));
    }

    setValue('page', String(pageNumber));
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>{isReading ? 'Stop page' : 'Start page'}:</h2>
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
          {isReading ? 'To stop' : 'To start'}
        </button>
      </form>
      {modalType === 'readBook' && <IsReadBookModal isOpen={isOpen} onClose={closeModal} />}
    </div>
  );
};

export default AddReading;
