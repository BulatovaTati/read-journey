import starMobile from '/images/star-mobile.png';
import starMobile2x from '/images/star-mobile@2x.png';
import starDesktop from '/images/star-desktop.png';
import starDesktop2x from '/images/star-desktop@2x.png';

import s from './StatisticNone.module.css';

const StatisticNone = () => {
  return (
    <div>
      <h2 className={s.title}>Progress</h2>
      <p className={s.text}>
        Here you will see when and how much you read.
        <span>To record, click on the red button above.</span>
      </p>
      <picture>
        <source srcSet={`${starMobile} 1x, ${starMobile2x} 2x`} media="(max-width: 767.98px)" />
        <source srcSet={`${starDesktop} 1x, ${starDesktop2x} 2x`} media="(min-width: 768px)" />
        <img src={starDesktop2x} alt="Books image" className={s.image} />
      </picture>
    </div>
  );
};

export default StatisticNone;
