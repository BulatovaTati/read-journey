import s from './Section.module.css';

interface ContainerProps {
  children: React.ReactNode;
  modClass?: string;
}

const Section = ({ children, modClass }: ContainerProps) => {
  return <section className={`${s.section} ${modClass}`}>{children}</section>;
};

export default Section;
