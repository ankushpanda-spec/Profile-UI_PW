import {cn} from '@/utils';
import {ReactNode} from 'react';

function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(className)}>
      <div className="max-w-[1180px]">{children}</div>
    </section>
  );
}

export default Container;
