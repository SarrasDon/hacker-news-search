import { PropsWithChildren } from 'react';
import './style.css';

export const Hint = ({ children }: PropsWithChildren) => {
  return <div className="text-hint">{children}</div>;
};
