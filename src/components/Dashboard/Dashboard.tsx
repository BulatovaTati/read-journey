import { ReactNode } from 'react';
import s from './Dashboard.module.css';

interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return <div className={s.dashboard}>{children}</div>;
};

export default Dashboard;
