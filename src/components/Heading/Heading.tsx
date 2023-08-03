import { PropsWithChildren } from 'react';
import './style.css';

export const Heading = ({ children }: PropsWithChildren) => {
  return <h2 className="heading">{children}</h2>;
};
