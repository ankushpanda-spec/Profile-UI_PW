import {cn} from '@pw-tech/omni-ui';
import {ReactNode} from 'react';
import s from './index.module.css';

function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id="pw-container" className={cn(s.container, className)}>
      <div className={s.children}>{children}</div>
    </section>
  );
}

export default Container;
