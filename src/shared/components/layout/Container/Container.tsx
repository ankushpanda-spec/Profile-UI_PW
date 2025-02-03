import { cn } from '@pw-tech/omni-ui';
import {ReactNode} from 'react';

function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id="pw-container"
      className={cn(
        'flex flex-col items-start self-stretch overflow-y-auto p-16 sm:px-32 sm:py-20 lg:items-center',
        className
      )}
    >
      <div className="w-[-webkit-fill-available] max-w-[1180px]">
        {children}
      </div>
    </section>
  );
}

export default Container;
