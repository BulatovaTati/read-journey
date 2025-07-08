import desktopImg from '/images/desktop-iPhone-Black.png';
import desktopImg2x from '/images/desktop-iPhone-Black@2x.png';
import mobileImg from '/images/mobile-iPhone-Black.png';
import mobileImg2x from '/images/mobile-iPhone-Black@2x.png';

import s from './AuthorizationImage.module.css';

const AuthorizationImage = () => {
  return (
    <div className={s.container}>
      <picture>
        <source srcSet={`${mobileImg} 1x, ${mobileImg2x} 2x`} media="(max-width: 767.98px)" />
        <source srcSet={`${desktopImg} 1x, ${desktopImg2x} 2x`} media="(min-width: 1280px)" />
        <img src={desktopImg} alt="iPhone image" className={s.image} />
      </picture>
    </div>
  );
};

export default AuthorizationImage;
