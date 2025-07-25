import { FallingLines } from 'react-loader-spinner';
import s from './Loader.module.css';
import clsx from 'clsx';

interface LoaderProps {
  modClass?: string;
}

const Loader = ({ modClass }: LoaderProps) => {
  return (
    <div className={clsx(s.loaderBackdrop, modClass)}>
      <div className={s.spinnerWrapper}>
        <FallingLines color="#30B94D" width="100" visible={true} />
      </div>
    </div>
  );
};

export default Loader;
