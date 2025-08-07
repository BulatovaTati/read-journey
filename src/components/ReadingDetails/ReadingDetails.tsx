import ReadingDiary from '../ReadingDiary/ReadingDiary';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectInfoCurrentBook } from '../../redux/books/selectors';
import Loader from '../Loader/Loader';
import Icon from '../Icon/Icon';
import ReadingStatistics from '../ReadingStatistics/ReadingStatistics';
import { Book } from '../../redux/books/books-types';
import s from './ReadingDetails.module.css';

type TabType = 'progress' | 'diagram';

const ReadingDetails = () => {
  const book: Book | null = useSelector(selectInfoCurrentBook);
  const [activeComponent, setActiveComponent] = useState<TabType>('progress');

  const handleButtonClick = (component: TabType) => {
    setActiveComponent(component);
  };

  if (!book || !book.progress) {
    return <Loader />;
  }

  return (
    <>
      <div className={s.container}>
        <p className={s.title}> {activeComponent === 'progress' ? 'Diary' : 'Statistics'}</p>
        <div className={s.controlls}>
          <button
            className={`${s.btn} ${activeComponent === 'progress' ? s.active : ''}`}
            onClick={() => handleButtonClick('progress')}
          >
            <Icon iconName="icon-hourglass" className={s.icon} width={20} height={20} />
          </button>
          <button
            className={`${s.btn} ${activeComponent === 'diagram' ? s.active : ''}`}
            onClick={() => handleButtonClick('diagram')}
          >
            <Icon iconName="icon-pie-chart" className={s.icon} width={20} height={20} />
          </button>
        </div>
      </div>

      {activeComponent === 'progress' ? <ReadingDiary /> : <ReadingStatistics />}
    </>
  );
};

export default ReadingDetails;
