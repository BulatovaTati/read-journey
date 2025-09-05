import clsx from 'clsx';
import Loader from './Loader';
import s from './Loader.module.css';

interface LoaderProps {
  modClass?: string;
}

const LocalLoader = ({ modClass }: LoaderProps) => {
  return (
    <div className={clsx(s.listContainer, modClass)}>
      <Loader modClass={s.listLoader} />
    </div>
  );
};

export default LocalLoader;
