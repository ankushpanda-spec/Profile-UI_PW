import {webSDK} from '@/shared/services/sdk';
import {Typography} from '@pw-tech/omni-ui';
import s from '../styles/index.module.css';
import useLearn2EarnData from '../hooks/useLearn2EarnData';

function Learn2EarnBadge() {
  const {data: learn2EarnProfileData} = useLearn2EarnData(
    // eslint-disable-next-line no-underscore-dangle
    webSDK?.cohortConfig?._id || ''
  );

  return (
    learn2EarnProfileData && (
      <div className={s.learn2earnContainer}>
        {learn2EarnProfileData?.highestLevel?.icon &&
          learn2EarnProfileData?.currentLevel?.icon !== 'NA' && (
            <div className={s.l2eBadgeContainer}>
              <img
                className={s.l2eBadge}
                src={learn2EarnProfileData?.currentLevel?.icon}
                alt="Current Level Icon"
              />
            </div>
          )}
        <Typography variant="small" weight="semi-bold" color="text-body-1">
          {learn2EarnProfileData?.currentLevel?.name !== 'NA'
            ? learn2EarnProfileData?.currentLevel?.name
            : 'No Current Level'}
        </Typography>
      </div>
    )
  );
}

export default Learn2EarnBadge;
