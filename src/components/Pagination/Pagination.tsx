import clsx from 'clsx';
import Icon from '../Icon/Icon';
import s from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  page: number;
}

const Pagination = ({ totalPages, handlePageChange, page }: PaginationProps) => {
  return (
    <div className={s.container}>
      <button
        className={clsx(s.button, {
          [s.buttonDisabled]: page === 1,
        })}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        <Icon
          iconName="icon-chevron-left"
          className={clsx(s.icon, {
            [s.iconDisabled]: page === 1,
          })}
        />
      </button>

      <button
        className={clsx(s.button, {
          [s.buttonDisabled]: page === totalPages,
        })}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        <Icon
          iconName="icon-chevron-right"
          className={clsx(s.icon, {
            [s.iconDisabled]: page === totalPages,
          })}
        />
      </button>
    </div>
  );
};

export default Pagination;
