import { XPIcon } from '@/assets/images';
import LevelUpOverviewData from '@/services/datalayer.service';
import { Tooltip, Typography } from '@pw-tech/omni-ui';
import { useState } from 'react';
import { InfoIcon } from '../icons';
import s from "./index.module.css";
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
                    origin="center"
                    position="bottom"
                    variant="dark"
                  >
                    <div className={s.levelUpWrapper}>
                      <div>
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
                <div className={s.levelUpParentTwo}>
                  <Tooltip
                    label={<InfoIcon />}
                    open={showTooltip}
                    onClose={handleToolTipClose}
                    origin="center"
                    position="left"
                    variant="dark"
                  >
                    <div className={s.levelUpParentThree}>
                      <div>
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
