import { FallingLines } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loaderBackdrop}>
      <div className={s.spinnerWrapper}>
        <FallingLines color="#30B94D" width="100" visible={true} />
      </div>
    </div>
  );
};

export default Loader;
