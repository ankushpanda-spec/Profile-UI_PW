import {
  Tooltip,
  TooltipBody,
  TooltipHeader,
  Typography,
} from '@pw-tech/omni-ui';
import {useState} from 'react';
import s from '../styles/index.module.css';
import {webSDK} from '@/shared/services/sdk';
import InfoIcon from '@/shared/assets/icons/InfoIcon';
import {XPIcon} from '../constants';
import useLearn2EarnData from '../hooks/useLearn2EarnData';

const LevelUpContainer = () => {
  const {data: learn2EarnProfileData} = useLearn2EarnData(
    // eslint-disable-next-line no-underscore-dangle
    webSDK?.cohortConfig?._id || ''
  );
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  function handleToolTipClose() {
    setShowTooltip(false);
  }
  return (
    <div className={s.levelUpContainer}>
      <div className={s.levelUpContainerChildOne}>
        <Typography
          variant="subHeading"
          color="static-black"
          weight="semi-bold"
        >
          Level Up Overview
        </Typography>
        <div className={s.levelUpContainerChildTwo}>
          <div className={s.levelUpMapContainer}>
            <Typography weight="semi-bold" variant="small" color="text-body-2">
              Total XP
            </Typography>
            <div className={s.infoIcon}>
              <Tooltip
                label={<InfoIcon />}
                open={showTooltip}
                onClose={() => handleToolTipClose()}
                origin="center"
                position="bottom"
                variant="dark"
              >
                <div className={s.levelUpWrapper}>
                  <TooltipHeader>Total XP</TooltipHeader>
                  <TooltipBody>
                    <Typography component="p" variant="small">
                      This is the lifetime XP that you have earned throughout
                      your PW Level Up journey. <br />
                      Note: This is not the Weekly XP that appears on the widget
                      in the top navigation bar.
                    </Typography>
                  </TooltipBody>
                </div>
              </Tooltip>
            </div>

            <div className={s.levelUpParentFour}>
              <Typography
                weight="semi-bold"
                variant="heading4"
                color="text-heading"
              >
                {learn2EarnProfileData?.totalXP ?? '-'}{' '}
              </Typography>
              <img src={XPIcon} height={24} width={24} alt="XPIcon" />
            </div>
          </div>
          <div className={s.levelUpMapContainer}>
            <div className={s.levelUpParent}>
              <Typography
                weight="semi-bold"
                variant="small"
                color="text-body-2"
              >
                Highest Level
              </Typography>
              <div className={s.infoIcon}>
                <Tooltip
                  label={<InfoIcon />}
                  open={showTooltip}
                  onClose={() => handleToolTipClose()}
                  origin="end"
                  position="bottom"
                  variant="dark"
                >
                  <div className={s.levelUpWrapper}>
                    <TooltipHeader>Highest Level</TooltipHeader>
                    <TooltipBody>
                      <Typography component="p" variant="small">
                        This is the highest level that you have reached at any
                        point in your PW Level Up journey.
                      </Typography>
                    </TooltipBody>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className={s.levelUpParentFour}>
              <Typography
                weight="semi-bold"
                variant="heading4"
                color="text-heading"
              >
                {learn2EarnProfileData?.highestLevel?.name ?? '-'}
              </Typography>
              {learn2EarnProfileData?.highestLevel?.icon &&
                (
                  <img
                    src={learn2EarnProfileData?.highestLevel?.icon}
                    height={20}
                    width={20}
                    alt=""
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelUpContainer;
