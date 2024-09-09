import { cn } from '@/utils';
import { Typography } from '@pw-tech/omni-ui';
import * as Popover from '@radix-ui/react-popover';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export interface Options extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: ReactNode;
  label: string;
  className?: string;
  href: string;
}

function AvatarPopover({
  options,
  children,
}: {
  options: Options[];
  children: ReactNode;
}) {
  const renderOptions = () => {
    return (
      <div className="flex flex-col">
        {options.map((item, index) => {
          const {label, icon, className, ...rest} = item;
          return (
              <Link
                key={index}
                to={item?.href}
                className={cn(
                  'flex h-48 max-w-full cursor-pointer flex-row items-center justify-start gap-16 overflow-hidden text-ellipsis whitespace-nowrap border-e-transparent px-16 leading-48 transition-colors duration-100 hover:bg-[#0000000a]',
                  className
                )}
                {...rest}
              >
                <div>{icon}</div>
                <Typography variant="small">{label}</Typography>
              </Link>
          );
        })}
      </div>
    );
  };

  return (
    <Popover.Root defaultOpen={false}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="PopoverContent"
          sideOffset={-3}
          data-side="top"
          data-align="center"
        >
          <div className="py-8">{renderOptions()}</div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default AvatarPopover;
