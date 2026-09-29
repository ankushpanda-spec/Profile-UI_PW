import {Typography} from '@pw-tech/omni-ui';
import {useNavigate} from 'react-router-dom';
import VerifiedIcon from '@/shared/assets/icons/Verified';
import {webSDK} from '@/shared/services/sdk';
import cn from '@/shared/lib';
import s from '../styles/index.module.css';
import useLearn2EarnData from '../hooks/useLearn2EarnData';

const ProfileBadges = () => {
  const navigate = useNavigate();
  const {data: learn2EarnProfileData} = useLearn2EarnData(
    // eslint-disable-next-line no-underscore-dangle
    webSDK?.cohortConfig?._id || ''
  );

  const currentLevel = learn2EarnProfileData?.currentLevel;
  const hasLevelIcon = !!currentLevel?.icon && currentLevel.icon !== 'NA';

  const navigateToStudentMaster = () => {
    navigate('/student-master-program?cameFrom=Profile');
  };

  return (
    <div className={s.badgeRow}>
      {learn2EarnProfileData && (
        <div className={cn(s.badge, s.badgeLevel)}>
          {hasLevelIcon && (
            <img
              className={s.levelIcon}
              src={currentLevel.icon}
              alt="Current Level"
            />
          )}
          <Typography variant="small" weight="semi-bold" color="text-heading">
            {currentLevel?.name !== 'NA'
              ? currentLevel?.name
              : 'No Current Level'}
          </Typography>
        </div>
      )}
      <div
        className={cn(s.badge, s.badgeStudentMaster)}
        role="button"
        tabIndex={0}
        onClick={navigateToStudentMaster}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            navigateToStudentMaster();
          }
        }}
      >
        <VerifiedIcon className={s.badgeIcon} />
        <Typography variant="small" weight="semi-bold" color="text-heading">
          Student Master
        </Typography>
      </div>
    </div>
  );
};

export default ProfileBadges;
