import { FC } from 'react';
import Icon from '../Icon/Icon';
import s from './RecommendedList.module.css';

interface DeleteBtnProps {
  onClick: () => void;
}

const DeleteBtn: FC<DeleteBtnProps> = ({ onClick }) => {
  return (
    <button type="button" className={s.deleteBtn} onClick={onClick}>
      <Icon iconName="icon-delete" className={s.iconDelete} width={28} height={28} />
    </button>
  );
};

export default DeleteBtn;
