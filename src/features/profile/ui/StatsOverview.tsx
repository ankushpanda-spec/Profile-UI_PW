import {
  Tooltip,
  TooltipBody,
  TooltipHeader,
  Typography,
} from '@pw-tech/omni-ui';
import {useState} from 'react';
import {useScreen} from '@pw-tech/omni-context';
import {webSDK} from '@/shared/services/sdk';
import s from '../styles/index.module.css';
import {InfoIcon, XPIcon} from '../constants';
import {StatTile} from '../types';
import useLearn2EarnData from '../hooks/useLearn2EarnData';
import useFeedbackData from '../hooks/useGetFeedbackPerformance';

const StatCard = ({
  title,
  value,
  info,
  icon,
  index,
}: StatTile & {index: number}) => {
  const {isMobile} = useScreen();
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // The tooltip is a fixed 280/360px box. `origin="end"` shifts it left
  // (needed for the rightmost column so it doesn't run off-screen);
  // `origin="center"` leaves it centered on the icon, which already fits
  // for every other column.
  const isLastColumn = isMobile ? index % 2 === 1 : index >= 2;

  return (
    <div className={s.statCard}>
      <div className={s.statHeader}>
        <Typography
          className={s.statLabel}
          variant="small"
          weight="semi-bold"
          color="text-heading"
        >
          {title}
        </Typography>
        <Tooltip
          label={
            <button
              type="button"
              className={s.statInfoIconButton}
              aria-label={`${title} info`}
              onClick={() => setShowInfo(!showInfo)}
            >
              <img className={s.statInfoIcon} src={InfoIcon} alt="" />
            </button>
          }
          open={showInfo}
          onClose={() => setShowInfo(false)}
          origin={isLastColumn ? 'end' : 'center'}
          position="bottom"
          variant="dark"
        >
          <div className={s.statTooltip}>
            <TooltipHeader>{title}</TooltipHeader>
            <TooltipBody>
              <Typography
                component="p"
                variant="small"
                color="grey-200"
                dangerouslySetInnerHTML={{__html: info}}
              />
            </TooltipBody>
          </div>
        </Tooltip>
      </div>
      <div className={s.statValueRow}>
        <Typography
          className={s.statValue}
          variant="subHeading"
          weight="bold"
          color="text-heading"
        >
          {value}
        </Typography>
        {icon && <img className={s.statValueIcon} src={icon} alt="" />}
      </div>
    </div>
  );
};

const StatsOverview = () => {
  const {data: learn2EarnProfileData} = useLearn2EarnData(
    // eslint-disable-next-line no-underscore-dangle
    webSDK?.cohortConfig?._id || ''
  );
  const {data: doubtSolverPerformance} = useFeedbackData();

  const highestLevel = learn2EarnProfileData?.highestLevel;
  const hasHighestLevel = !!highestLevel?.name && highestLevel.name !== 'NA';
  const satisfactoryRate = doubtSolverPerformance?.satisfactoryRate;

  const tiles: StatTile[] = [
    {
      title: 'Total XP',
      value: learn2EarnProfileData?.totalXP ?? '-',
      icon: XPIcon,
      info: 'This is the lifetime XP that you have earned throughout your PW Level Up journey. <br/> Note: This is not the Weekly XP that appears on the widget in the top navigation bar.',
    },
    {
      title: 'Highest Level',
      value: hasHighestLevel ? highestLevel.name : '-',
      icon:
        hasHighestLevel && highestLevel.icon !== 'NA'
          ? highestLevel.icon
          : undefined,
      info: 'This is the highest level that you have reached at any point in your PW Level Up journey.',
    },
    {
      title: 'Doubts Solved',
      value: doubtSolverPerformance?.totalSolved ?? '-',
      info: 'Number of doubts you have answered',
    },
    {
      title: 'Satisfactory Rate',
      value: satisfactoryRate == null ? '-' : `${satisfactoryRate}%`,
      info: 'Number of likes/<br/>(Number of likes + dislikes)',
    },
  ];

  return (
    <div className={s.statsGrid}>
      {tiles.map((tile: StatTile, index: number) => (
        <StatCard key={tile.title} {...tile} index={index} />
      ))}
    </div>
  );
};

export default StatsOverview;
