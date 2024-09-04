import {ChevronRight} from '@/assets/icons';
import {Typography} from '@pw-tech/omni-ui';

type CohortProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconSrc?: string;
};

function Cohort({iconSrc, ...props}: CohortProps) {
  return (
    <button
      className="transition-color flex flex-row items-center gap-6 rounded border border-primary-50 bg-white p-6 shadow-sm duration-300 ease-in-out hover:border-primary-200 md:gap-12 md:p-8 lg:gap-16 lg:p-12"
      {...props}
    >
      <div className="flex flex-row items-center gap-8">
        {iconSrc && <img src={iconSrc} className="size-20 sm:size-24" />}
        <Typography color="static-black" variant="small" weight="semi-bold">
          {props.children}
        </Typography>
      </div>
      <ChevronRight className="size-16 xl:size-24" />
    </button>
  );
}

export default Cohort;
