import { useFeedbackData } from '@/hooks/useGetFeedbackPerformance';
import { cn } from '@/utils';
import { Typography } from '@pw-tech/omni-ui';
import { useEffect, useState } from 'react';
import { InfoIcon } from '../../../../components/icons';
import s from "../styles/index.module.css";
import { useNavigate } from 'react-router-dom';
const DoubtSolverCard = ({
  title,
  info,
  data,
}: {
  title: string;
  info: string;
  data: string;
}) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };
  return (
    <div
      className={cn(s.pdContainer, showInfo ? s.pdBgBlack : s.pdBgDefault)}
    >
      <InfoIcon height={10} width={10} className={s.infoIcon} onClick={handleInfoClick} />
      <div className={s.PDtextContainer}>
        <Typography variant="tiny">{title}</Typography>
        <Typography variant="heading4" weight="bold">
          {data}
        </Typography>
        {showInfo && (
          <div className={s.infoContainer}>
            <span
              className={s.infoText}
              dangerouslySetInnerHTML={{ __html: info }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const PerformanceDetails = () => {
  const [tiles, setTiles] = useState<any>([]);
  const { data: _PerformanceAsDoubtSolver } = useFeedbackData();
  const navigate = useNavigate();
  useEffect(() => {
    setTiles([
      {
        title: 'Total Doubts Solved:',
        value: _PerformanceAsDoubtSolver?.totalSolved,
        info: 'No. of doubts you have answered',
      },
      {
        title: 'Satisfactory Rate:',
        value: _PerformanceAsDoubtSolver?.satisfactoryRate + '%',
        info: 'No. of likes/<br/>(No. of likes + dislikes)',
      },
    ]);
  }, [_PerformanceAsDoubtSolver]);
  
  const navigateToStudentMaster = () => {
    navigate("/student-master-program?cameFrom=Profile")
  }
  return (
    <div className={s.pdParent}>
      <div className={s.pdParentOne}>
        <Typography variant="heading4" weight="semi-bold" color="static-black">
          Performace as Doubt Solver
        </Typography>
        <Typography color="primary" weight="semi-bold" variant="tiny" className={s.knowMore} onClick={navigateToStudentMaster}>
          Know more
        </Typography>
      </div>
      <div className={s.titleContainer}>
        {tiles.map((tile: any, index: number) => {
          return (
            <DoubtSolverCard
              key={index}
              title={tile.title}
              data={tile.value}
              info={tile.info}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceDetails;
