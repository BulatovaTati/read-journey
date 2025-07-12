import desktopImg from '/images/book-desktop.png';
import desktopImg2x from '/images/book-desktop@2x.png';
import s from './Quote.module.css';

const Quote = () => {
  return (
    <div className={s.quote}>
      <picture>
        <source srcSet={`${desktopImg} 1x, ${desktopImg2x} 2x`} media="(min-width: 1280px)" />
        <img src={desktopImg} alt="Books image" />
      </picture>
      <p>
        Books are <span className={s.text}>windows</span> to the world, and reading is a journey
        into the unknown.
      </p>
    </div>
  );
};

export default Quote;
