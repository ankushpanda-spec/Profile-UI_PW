import {Tooltip, TooltipBody, Typography} from '@pw-tech/omni-ui';
import {useEffect, useState} from 'react';
import s from '../styles/index.module.css';
import {useNavigate} from 'react-router-dom';
import cn from '@/shared/lib';
import InfoIcon from '@/shared/assets/icons/InfoIcon';
import {Tiles} from '../types';
import useFeedbackData from '../hooks/useGetFeedbackPerformance';
import {useScreen} from '@pw-tech/omni-context';

const DoubtSolverCard = ({
  title,
  info,
  data,
  index,
}: {
  title: string;
  info: string;
  data: string | number;
  index: number;
}) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };
  const {isMobile} = useScreen();
  return (
    <div className={cn(s.pdContainer, showInfo ? s.pdBgBlack : s.pdBgDefault)}>
      <Typography variant="small" weight="semi-bold" color="text-body-2">
        {title}
      </Typography>
      <Typography variant="heading4" weight="semi-bold" color="text-heading">
        {data}
      </Typography>
      <div className={s.infoIcon}>
        <Tooltip
          label={<InfoIcon />}
          open={showInfo}
          onClose={handleInfoClick}
          origin={(() => {
            if (index === 0) {
              return isMobile ? 'end' : 'center';
            }
            return 'end';
          })()}
          position="top"
          variant="dark"
        >
          <div className={s.infoTextContainer}>
            <TooltipBody>
              <Typography
                component="p"
                variant="small"
                dangerouslySetInnerHTML={{__html: info}}
              />
            </TooltipBody>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

const PerformanceDetails = () => {
  const [tiles, setTiles] = useState<Tiles[]>([]);
  const {data: _PerformanceAsDoubtSolver} = useFeedbackData();
  const navigate = useNavigate();
  useEffect(() => {
    setTiles([
      {
        title: 'Total Doubts Solved',
        value: _PerformanceAsDoubtSolver?.totalSolved || 0,
        info: 'Number of doubts you have answered',
      },
      {
        title: 'Satisfactory Rate',
        value: `${_PerformanceAsDoubtSolver?.satisfactoryRate}%`,
        info: 'Number of likes/<br/>(Number of likes + dislikes)',
      },
    ]);
  }, [_PerformanceAsDoubtSolver]);

  const navigateToStudentMaster = () => {
    navigate('/student-master-program?cameFrom=Profile');
  };
  return (
    <div className={s.pdParent}>
      <div className={s.pdParentOne}>
        <Typography variant="heading3" weight="semi-bold" color="static-black">
          Doubt Solver Performance
        </Typography>
        <Typography
          color="primary"
          weight="semi-bold"
          variant="regular"
          className={s.knowMore}
          onClick={navigateToStudentMaster}
        >
          Know more
        </Typography>
      </div>
      <div className={s.titleContainer}>
        {tiles.map((tile: Tiles, index: number) => {
          return (
            <DoubtSolverCard
              key={index}
              title={tile.title}
              data={tile.value}
              info={tile.info}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceDetails;
