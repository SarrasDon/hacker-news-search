import { PropsWithChildren } from 'react';
import './style.css';

export const List = ({ children }: PropsWithChildren) => {
  return <ul className="list">{children}</ul>;
};
