import { useState } from 'react';

import ReadingDiary from '../ReadingDiary/ReadingDiary';
import ReadingStatistics from '../ReadingStatistics/ReadingStatistics';
import Loader from '../Loader/Loader';
import Icon from '../Icon/Icon';

import { selectInfoCurrentBook } from '../../redux/books/selectors';
import { useAppSelector } from '../../redux/hooks';

import s from './ReadingDetails.module.css';

type TabType = 'progress' | 'diagram';

const ReadingDetails = () => {
  const book = useAppSelector(selectInfoCurrentBook);
  const [activeComponent, setActiveComponent] = useState<TabType>('progress');

  const handleButtonClick = (component: TabType) => setActiveComponent(component);

  if (!book || !book.progress) return <Loader />;

  return (
    <>
      <div className={s.container}>
        <p className={s.title}> {activeComponent === 'progress' ? 'Diary' : 'Statistics'}</p>
        <div className={s.controlls}>
          <button
            className={`${s.btn} ${activeComponent === 'progress' ? s.active : ''}`}
            onClick={() => handleButtonClick('progress')}
          >
            <Icon iconName="icon-hourglass" width={20} height={20} />
          </button>
          <button
            className={`${s.btn} ${activeComponent === 'diagram' ? s.active : ''}`}
            onClick={() => handleButtonClick('diagram')}
          >
            <Icon iconName="icon-pie-chart" width={20} height={20} />
          </button>
        </div>
      </div>

      {activeComponent === 'progress' ? <ReadingDiary /> : <ReadingStatistics />}
    </>
  );
};

export default ReadingDetails;
