import { ReactNode, FC } from 'react';
import s from './Dashboard.module.css';

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: FC<DashboardProps> = ({ children }) => {
  return <div className={s.dashboard}>{children}</div>;
};

export default Dashboard;
