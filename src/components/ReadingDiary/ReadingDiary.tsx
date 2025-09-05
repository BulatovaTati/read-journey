import HowMuchWasRead from '../Reading/HowMuchWasRead/HowMuchWasRead';

import { selectInfoCurrentBook } from '../../redux/books/selectors';
import { Book } from '../../redux/books/books-types';
import { useAppSelector } from '../../redux/hooks';

import s from './ReadingDiary.module.css';
import { calculatePages, differenceInMinutes, groupReadingsByDate } from '../../helpers/reading';

const ReadingDiary = () => {
  const { progress = [], totalPages = 0 } = useAppSelector(selectInfoCurrentBook) ?? ({} as Book);
  const grouped = groupReadingsByDate(progress);

  return (
    <div className={s.readingDairy}>
      <ul className={s.readingList}>
        {Object.entries(grouped).map(([date, data], index) => {
          const isActive = data.readings.some(r => r.status === 'active');
          const isLatest = index === 0;
          const pages = calculatePages(data.readings);

          return (
            <li key={`${date}-${totalPages}`} className={isLatest ? s.latest : ''}>
              {isActive && data.readings.length === 1 ? (
                <div
                  className={`${s.titleContainer} ${isActive ? s.active : ''} ${
                    isLatest ? s.latest : ''
                  }`}
                >
                  <p className={s.date}> Reading started </p>
                  <p className={s.pages}>......</p>
                </div>
              ) : (
                <>
                  <div
                    className={`${s.titleContainer} ${isActive ? s.active : ''} ${
                      isLatest ? s.latest : ''
                    }`}
                  >
                    <p className={s.date}>{date}</p>
                    <p className={s.pages}>{pages + 1} pages</p>
                  </div>
                  <ul className={s.readingStats}>
                    {data.readings
                      .filter(r => r.status !== 'active')
                      .map(r => (
                        <HowMuchWasRead
                          key={`${r.startReading}-${r.finishReading ?? ''}`}
                          timeReading={differenceInMinutes(
                            r.startReading,
                            r.finishReading,
                            r.startPage,
                            r.finishPage,
                            totalPages,
                            r._id
                          )}
                        />
                      ))}
                  </ul>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReadingDiary;
