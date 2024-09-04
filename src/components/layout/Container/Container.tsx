import {cn} from '@/utils';
import {ReactNode} from 'react';

function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn(className)}>{children}</section>;
}

export default Container;
