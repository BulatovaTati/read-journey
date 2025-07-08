import Sprite from '/sprite.svg';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string;
}

const Icon: React.FC<IconProps> = ({ iconName, className, ...props }) => {
  return (
    <svg className={className} role="img" {...props}>
      <use href={`${Sprite}#${iconName}`} />
    </svg>
  );
};

export default Icon;
