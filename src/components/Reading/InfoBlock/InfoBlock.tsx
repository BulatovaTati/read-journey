import Icon from '../../Icon/Icon';
import s from '../Reading.module.css';

interface InfoBlockProps {
  imageUrl: string;
  title: string;
  author: string;
  isRead: boolean;
}

const InfoBlock = ({ imageUrl, title, author, isRead }: InfoBlockProps) => {
  return (
    <div className={s.info}>
      <img src={imageUrl} className={s.image} />
      <p className={s.bookTitle}>{title}</p>
      <p className={s.author}>{author}</p>
      {isRead ? (
        <Icon iconName="icon-play" width="40" height="40" className={s.icon} />
      ) : (
        <Icon iconName="icon-pause" width="40" height="40" className={s.icon} />
      )}
    </div>
  );
};

export default InfoBlock;
