import { Book, TimeLeftToRead } from '../redux/books/books-types';

export const calculateTimeLeft = (book: Book): TimeLeftToRead => {
  const totalPages = book.totalPages;

  if (book.status === 'done') {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  if (!book.progress || book.progress.length === 0) {
    const pagesPerMinute = 2;
    const minutesLeft = Math.ceil(totalPages / pagesPerMinute);
    const hours = Math.floor(minutesLeft / 60);
    const minutes = minutesLeft % 60;
    return { hours, minutes, seconds: 0 };
  }

  const readPages = book.progress
    .filter(r => r.status === 'inactive')
    .reduce((sum, r) => sum + ((r.finishPage ?? r.startPage) - r.startPage), 0);

  const activeReading = book.progress.find(r => r.status === 'active');
  const activePages = activeReading
    ? (activeReading.finishPage ?? activeReading.startPage) - activeReading.startPage
    : 0;

  const pagesLeft = totalPages - (readPages + activePages);
  const pagesPerMinute = 2;
  const minutesLeft = Math.max(0, Math.ceil(pagesLeft / pagesPerMinute));
  const hours = Math.floor(minutesLeft / 60);
  const minutes = minutesLeft % 60;

  return { hours, minutes, seconds: 0 };
};
