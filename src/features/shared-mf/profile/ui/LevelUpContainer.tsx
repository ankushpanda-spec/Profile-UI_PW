import {
  Tooltip,
  TooltipBody,
  TooltipHeader,
  Typography,
} from '@pw-tech/omni-ui';
import {useState} from 'react';
import s from '../styles/index.module.css';
import {useLearn2EarnData} from '@/shared/hooks/useLearn2EarnData';
import {webSDK} from '@/shared/services/sdk';
import InfoIcon from '@/shared/assets/icons/InfoIcon';
import { XPIcon } from '../constants';
const LevelUpContainer = () => {
  const {data: learn2EarnProfileData} = useLearn2EarnData(
    webSDK?.cohortConfig._id || ''
  );
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  function handleToolTipClose() {
    setShowTooltip(false);
  }
  return (
    <div className={s.levelUpContainer}>
      <div className={s.levelUpContainerChildOne}>Level Up Overview</div>
      <div className={s.levelUpContainerChildTwo}>
        <div className={s.levelUpMapContainer}>
          <div className={s.levelUpParent}>
            <Typography weight="semi-bold" variant="small" color="tertiary">
              Total XP
            </Typography>
            <div className={s.levelUpParentTwo}>
              <Tooltip
                label={<InfoIcon />}
                open={showTooltip}
                onClose={handleToolTipClose}
                origin={'center'}
                position="bottom"
                variant="dark"
              >
                <div className={s.levelUpWrapper}>
                  <TooltipHeader>Total XP</TooltipHeader>
                  <TooltipBody>
                  <Typography component="p" variant="small">
                    This is the lifetime XP that you have earned throughout your
                    PW Level Up journey. <br />
                    Note : That this is not the Weekly XP that appears on the
                    widget in the top navigation bar.
                    </Typography>
                  </TooltipBody>
                </div>
              </Tooltip>
            </div>
          </div>
          <div className={s.levelUpParentFour}>
            {learn2EarnProfileData?.totalXP ?? 'NA'}{' '}
            <img src={XPIcon} height={18} width={18} />
          </div>
        </div>
        <div className={s.levelUpMapContainer}>
          <div className={s.levelUpParent}>
            <Typography weight="semi-bold" variant="small" color="tertiary">
              Highest Level
            </Typography>
            <div className={s.levelUpParentTwo}>
              <Tooltip
                label={<InfoIcon />}
                open={showTooltip}
                onClose={handleToolTipClose}
                origin={'end'}
                position="bottom"
                variant="dark"
              >
                <div className={s.levelUpWrapper}>
                  <TooltipHeader>Highest Level</TooltipHeader>
                  <TooltipBody>
                    <Typography component="p" variant="small">
                    This is the highest level that you have reached at any point
                    in your PW Level Up journey.
                    </Typography>
                  </TooltipBody>
                </div>
              </Tooltip>
            </div>
          </div>
          <div className={s.levelUpParentFour}>
            {learn2EarnProfileData?.highestLevel?.name ?? 'NA'}
            {learn2EarnProfileData?.highestLevel?.icon &&
              learn2EarnProfileData?.highestLevel?.icon !== 'NA' && (
                <img
                  src={learn2EarnProfileData?.highestLevel?.icon}
                  height={18}
                  width={18}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelUpContainer;
