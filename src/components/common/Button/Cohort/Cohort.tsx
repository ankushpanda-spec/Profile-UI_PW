import { ChevronRight } from '@/assets/icons';
import { cn } from '@/utils';
import { Skeleton, Typography } from '@pw-tech/omni-ui';

type CohortProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconSrc?: string;
};

function Cohort({iconSrc, className, ...props}: CohortProps) {
  return (
    <button
      className={cn("flex flex-row items-center gap-6 rounded border border-primary-50 bg-white p-6 shadow-md transition-all duration-300 ease-in-out hover:border-primary-200 md:gap-12 md:p-8 lg:gap-16 lg:p-12", className)}
      {...props}
    >
      <div className="flex flex-row items-center gap-8">
        {iconSrc ? (
          <img src={iconSrc} className="size-20 sm:size-24" />
        ) : (
          <Skeleton animate className="size-20 rounded-full sm:size-24" />
        )}
        {props.children ? (
          <Typography color="static-black" variant="small" weight="semi-bold">
            {props.children}
          </Typography>
        ) : (
          <Skeleton animate className="h-[12px] w-[50px]" />
        )}
      </div>
      <ChevronRight className="size-16 xl:size-24" />
    </button>
  );
}

export default Cohort;
