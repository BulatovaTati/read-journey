import { FC } from 'react';
import Sprite from '/sprite.svg';
import clsx from 'clsx';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string;
  isDisabled?: boolean;
}

const Icon: FC<IconProps> = ({ iconName, className, isDisabled, ...props }) => {
  return (
    <svg className={clsx(className, { 'icon-disabled': isDisabled })} role="img" {...props}>
      <use href={`${Sprite}#${iconName}`} />
    </svg>
  );
};

export default Icon;
