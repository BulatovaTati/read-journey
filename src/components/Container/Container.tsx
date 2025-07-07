import s from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  modClass?: string;
}

const Container = ({ children, modClass }: ContainerProps) => {
  return <div className={`${s.container} ${modClass}`}>{children}</div>;
};

export default Container;
