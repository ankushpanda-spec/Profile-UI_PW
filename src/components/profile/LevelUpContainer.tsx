import {XPIcon} from '@/assets/images';
import LevelUpOverviewData from '@/services/datalayer.service';
import {Tooltip, Typography} from '@pw-tech/omni-ui';
import {useState} from 'react';
import {InfoIcon} from '../icons';
const LevelUpContainer = () => {
  const data = LevelUpOverviewData;
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  function handleToolTipClose() {
    setShowTooltip(false);
  }
  return (
    <div className="my-12 mb-40 flex flex-col rounded-lg bg-[#f1f5fe] p-16">
      <div className="text-xl font-bold text-black">Level Up Overview</div>
      <div className="mt-8 grid grid-cols-2 gap-16">
        {data.map((el: any, index: number) => {
          return (
            <div
              key={index}
              className="border-1 mt-10 flex flex-col rounded-lg bg-white p-16"
            >
              <div className="flex justify-between">
                <div className="text-pw-grey-500">
                  <Typography weight="semi-bold" variant="small">
                    {el.title}
                  </Typography>
                </div>
                <div className="block lg:hidden">
                  <Tooltip
                    label={<InfoIcon />}
                    open={showTooltip}
                    onClose={handleToolTipClose}
                    origin="center"
                    position="bottom"
                    variant="dark"
                  >
                    <div className="p-16">
                      <div className="text-base font-semibold lg:text-lg">
                        {el.tooltip.title}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: el.tooltip.content,
                        }}
                      />
                    </div>
                  </Tooltip>
                </div>
                <div className="hidden lg:block">
                  <Tooltip
                    label={<InfoIcon />}
                    open={showTooltip}
                    onClose={handleToolTipClose}
                    origin="center"
                    position="left"
                    variant="dark"
                  >
                    <div className="p-4">
                      <div className="text-base font-semibold lg:text-lg">
                        {el.tooltip.title}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: el.tooltip.content,
                        }}
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="flex pt-8">
                {el.score}{' '}
                <img src={XPIcon} height={18} width={18} className="ml-1" />
              </div>
            </div>
          );
        })}

        {/* Total XP */}
      </div>
    </div>
  );
};

export default LevelUpContainer;
