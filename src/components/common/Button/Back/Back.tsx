import {ChevronLeft} from '@/assets/icons';
import {Typography} from '@pw-tech/omni-ui';

function Back(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex h-80 w-80 shrink-0 items-center justify-center gap-4 transition-all duration-300 ease-in-out hover:gap-8"
      {...props}
    >
      <ChevronLeft className="size-16 shrink-0" />
      <Typography color="static-black" variant="small" weight="semi-bold">
        Back
      </Typography>
    </button>
  );
}

export default Back;
