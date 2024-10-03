import {cn} from '@/utils';
import {Typography} from '@pw-tech/omni-ui';
import * as Popover from '@radix-ui/react-popover';
import {ReactNode, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
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
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              onClick={() => setTimeout(() => setOpen(false), 0)}
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
    <Popover.Root defaultOpen={false} open={open}>
      <Popover.Trigger asChild ref={triggerRef} onClick={() => setOpen(!open)}>
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          ref={popoverRef}
          style={{
            boxShadow: '0px 8px 24px 2px rgba(0,0,0,0.2)',
          }}
          className={cn('PopoverContent', 'z-[1]')}
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
