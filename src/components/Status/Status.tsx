import { PropsWithChildren } from 'react';
import './style.css';

export const Status = ({ children }: PropsWithChildren) => {
  return <div className="status-text">{children}</div>;
};
