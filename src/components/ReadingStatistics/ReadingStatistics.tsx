import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { selectInfoCurrentBook } from '../../redux/books/selectors';
import Loader from '../Loader/Loader';
import s from './ReadingStatistics.module.css';
import { Book } from '../../redux/books/books-types';
ChartJS.register(ArcElement, Legend);

const ReadingStatistics = () => {
  const { progress = [], totalPages = 0 } = useSelector(selectInfoCurrentBook) ?? ({} as Book);

  const maxPage = Math.max(
    ...progress
      .filter((item: any) => item.status !== 'active')
      .map((reading: any) => reading.finishPage)
  );

  const readBookPercent: any = ((maxPage / totalPages) * 100).toFixed(2);
  const percentUnread: any = 100 - readBookPercent;

  const data = {
    labels: ['Read', 'Unread'],
    datasets: [
      {
        data: [readBookPercent, percentUnread],
        backgroundColor: ['#30B94D', '#1F1F1F'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={s.statistic}>
      {maxPage > 0 ? (
        <>
          <div className={s.chartContainer}>
            <Pie data={data} options={options} />
            <div className={s.centerInfo}>{readBookPercent}%</div>
          </div>

          <div className={s.pagesContainer}>
            <div>
              <p className={s.percent}>{readBookPercent}%</p>
              <span className={s.maxPage}>{maxPage} pages read</span>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ReadingStatistics;
