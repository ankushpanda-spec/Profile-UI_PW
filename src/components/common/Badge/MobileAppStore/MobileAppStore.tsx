import {GetItOnText, GooglePlayText, PlayStore} from '@/assets/icons';
import {cn} from '@/utils';
import s from './index.module.css';

function MobileAppStore(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex h-[25px] w-[84px] flex-row items-center justify-around rounded-[5px] border border-[#A6A6A6] bg-black"
      {...props}
    >
      <PlayStore
        className={cn(
          'h-[16.075px] w-[14.367px] flex-shrink-0',
          s['google-play-logo']
        )}
      />
      <div className="flex flex-col justify-between gap-2">
        <GetItOnText className="fill-white" />
        <GooglePlayText className="fill-white" />
      </div>
    </button>
  );
}

export default MobileAppStore;
