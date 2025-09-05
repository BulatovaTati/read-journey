import clsx from 'clsx';
import Sprite from '/sprite.svg';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string;
  isDisabled?: boolean;
}

const Icon = ({ iconName, className, isDisabled, ...props }: IconProps) => {
  return (
    <svg className={clsx(className, { 'icon-disabled': isDisabled })} role="img" {...props}>
      <use href={`${Sprite}#${iconName}`} />
    </svg>
  );
};

export default Icon;
