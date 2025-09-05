import { ReadingProgress } from '../redux/books/books-types';

export const groupReadingsByDate = (progress: ReadingProgress[]) => {
  return progress.reduceRight<Record<string, { date: string; readings: ReadingProgress[] }>>(
    (acc, curr) => {
      const finishDate = new Date(curr.startReading).toLocaleDateString();
      if (!acc[finishDate]) {
        acc[finishDate] = { date: finishDate, readings: [] };
      }
      acc[finishDate].readings.push(curr);
      return acc;
    },
    {}
  );
};

export const calculatePages = (readings: ReadingProgress[]) => {
  const finished = readings.filter(r => r.status !== 'active');
  if (finished.length === 0) return 0;

  const startPages = finished.map(r => r.startPage);
  const finishPages = finished.map(r => r.finishPage).filter((p): p is number => p !== undefined);

  if (finishPages.length === 0) return 0;

  const minStartPage = Math.min(...startPages);
  const maxFinishPage = Math.max(...finishPages);
  return maxFinishPage - minStartPage;
};

export const differenceInMinutes = (
  startReading: string,
  finishReading: string | undefined,
  startPage: number,
  finishPage: number | undefined,
  totalPages: number,
  _id: string
) => {
  if (!finishReading || finishPage === undefined) {
    return { minutes: 0, pages: 0, percent: 0, readId: _id };
  }

  const startR = new Date(startReading);
  const finishR = new Date(finishReading);

  const minutes = Math.floor((finishR.getTime() - startR.getTime()) / (1000 * 60));
  const pages = finishPage - startPage;
  const percent = Number(((pages / totalPages) * 100).toFixed(2));

  return { minutes, pages, percent, readId: _id };
};
