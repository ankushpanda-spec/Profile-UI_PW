import LevelUpOverviewData from '@/services/datalayer.service';
import { Tooltip, TooltipBody, TooltipHeader, Typography } from '@pw-tech/omni-ui';
import { useState } from 'react';
import s from "../styles/index.module.css";
import { InfoIcon } from '@/components/icons';
import { XPIcon } from '../constants';
const LevelUpContainer = () => {
  const data = LevelUpOverviewData;
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  function handleToolTipClose() {
    setShowTooltip(false);
  }
  return (
    <div className={s.levelUpContainer}>
      <div className={s.levelUpContainerChildOne}>Level Up Overview</div>
      <div className={s.levelUpContainerChildTwo}>
        {data.map((el: any, index: number) => {
          return (
            <div
              key={index}
              className={s.levelUpMapContainer}
            >
              <div className={s.levelUpParent}>
                <Typography weight="semi-bold" variant="small" color='tertiary'>
                  {el.title}
                </Typography>
                <div className={s.levelUpParentTwo}>
                  <Tooltip

                    label={<InfoIcon />}
                    open={showTooltip}
                    onClose={handleToolTipClose}
                    origin={index == 0 ? "center" : "end"}
                    position="bottom"
                    variant="dark"
                  >
                    <div className={s.levelUpWrapper}>
                      <TooltipHeader>{el.tooltip.title}</TooltipHeader>
                      <TooltipBody>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: el.tooltip.content,
                          }}
                        />
                      </TooltipBody>
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className={s.levelUpParentFour}>
                {el.score}{' '}
                <img src={XPIcon} height={18} width={18} />
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
