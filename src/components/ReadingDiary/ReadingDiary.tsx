import { useSelector } from 'react-redux';
import { selectInfoCurrentBook } from '../../redux/books/selectors';
import Loader from '../Loader/Loader';
import HowMuchWasRead from '../Reading/HowMuchWasRead/HowMuchWasRead';
import { Book } from '../../redux/books/books-types';
import s from './ReadingDiary.module.css';

const ReadingDiary = () => {
  const { progress = [], totalPages = 0 } = useSelector(selectInfoCurrentBook) ?? ({} as Book);
  const groupedByDateWithTotalPages = progress.reduceRight((acc: any, curr: any) => {
    const finishDate = new Date(curr.startReading).toLocaleDateString();

    if (!acc[finishDate]) {
      acc[finishDate] = [];
    }

    acc[finishDate].push(curr);
    return acc;
  }, {});

  for (const date in groupedByDateWithTotalPages) {
    const readings = groupedByDateWithTotalPages[date];
    const minStartPage = Math.min(
      ...readings
        .filter((item: any) => item.status !== 'active')
        .map((reading: any) => reading.startPage)
    );
    const maxFinishPage = Math.max(
      ...readings
        .filter((item: any) => item.status !== 'active')
        .map((reading: any) => reading.finishPage)
    );
    const pages = maxFinishPage - minStartPage;
    groupedByDateWithTotalPages[date] = { date, pages, readings };
  }

  function differenceInMinutes(
    startReading: any,
    finishReading: any,
    startPage: number,
    finishPage: number,
    _id: string
  ) {
    const startR = new Date(startReading);
    const finishR = new Date(finishReading);

    const differenceInMilliseconds = finishR.getTime() - startR.getTime();
    const minutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    const readingPages = finishPage - startPage;
    const percent = Number(((readingPages / totalPages) * 100).toFixed(2));

    return { minutes, pages: readingPages, percent, readId: _id };
  }

  return (
    <div className={s.readingDairy}>
      <ul>
        {Object.entries(groupedByDateWithTotalPages).map(([date, data]: [string, any]) => {
          const isActive = data.readings.some((item: any) => item.status === 'active');

          if (isActive && data.readings.length === 1) {
            return (
              <div key={date}>
                <p>You started reading...</p>
                {/* <Loader /> */}
              </div>
            );
          }

          return (
            <li key={`${date}-${totalPages}`}>
              <div className={isActive ? `${s.title} ${s.active}` : s.title}>
                <h5>{date}</h5>
                <p className={s.pages}>{data.pages + 1} pages</p>
              </div>
              <ul>
                {data.readings
                  .filter((item: any) => item.status !== 'active')
                  .map(
                    ({
                      startReading,
                      finishReading,
                      startPage,
                      finishPage,
                      _id,
                    }: {
                      startReading: any;
                      finishReading: any;
                      startPage: number;
                      finishPage: number;
                      _id: string;
                    }) => (
                      <HowMuchWasRead
                        key={`${startReading}-${finishReading}`}
                        timeReading={differenceInMinutes(
                          startReading,
                          finishReading,
                          startPage,
                          finishPage,
                          _id
                        )}
                      />
                    )
                  )}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReadingDiary;
