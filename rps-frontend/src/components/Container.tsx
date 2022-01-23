import { ReactNode } from 'react';
import style from './container.module.css';

type ContainerProps = {
  children: ReactNode | ReactNode[];
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={style.container}>
      <div className={className}>
        {children}
      </div>
    </div>
  );
}