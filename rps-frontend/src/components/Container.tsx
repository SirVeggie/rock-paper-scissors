import { ReactNode } from 'react';
import style from './container.module.css';
import cx from 'classnames';

type ContainerProps = {
  children: ReactNode | ReactNode[];
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={style.container}>
      <div className={cx(style.inner, className)}>
        {children}
      </div>
    </div>
  );
}