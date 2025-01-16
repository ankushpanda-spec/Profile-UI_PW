import {webSDK} from '@/integration';
import {Typography} from '@pw-tech/omni-ui';
import {useEffect, useState} from 'react';
import {learn2earnData} from '../api';
import s from "../styles/index.module.css"

function Learn2EarnBage() {
  const [imgSrc, setImgSrc] = useState('NA');
  const [badgeName, setBadgeName] = useState('NA');
  useEffect(() => {
    const fetchData = async () => {
      const cohortId = webSDK?.cohortConfig._id || "";
      const learn2EarnProfileData = await learn2earnData(cohortId);
      setImgSrc(learn2EarnProfileData?.currentLevel?.icon);
      setBadgeName(learn2EarnProfileData?.currentLevel?.name);
    };

    fetchData();
  }, []);

  return (
    <div className={s.learn2earnContainer}>
      {imgSrc !== 'NA' && (
        <div className={s.l2eBadgeContainer}>
          <img className={s.l2eBadge} src={imgSrc} />
        </div>
      )}
      <Typography variant="small" weight="semi-bold" color="static-black">
        {badgeName}
      </Typography>
    </div>
  );
}

export default Learn2EarnBage;
