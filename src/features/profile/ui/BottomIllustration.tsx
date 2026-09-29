import {Typography} from '@pw-tech/omni-ui';
import s from '../styles/index.module.css';
import {HeartIcon, LoveLearningBadge} from '../constants';

const BottomIllustration = () => (
  <div className={s.illustration}>
    <div className={s.illustrationGrid} />
    <div className={s.illustrationFade} />
    <div className={s.illustrationGlow} />
    <img
      className={s.illustrationBadge}
      src={LoveLearningBadge}
      alt="Love Learning"
    />
    <div className={s.madeWith}>
      <Typography variant="small" color="text-body-2">
        Made with
      </Typography>
      <img className={s.madeWithHeart} src={HeartIcon} alt="" />
      <Typography variant="small" color="text-body-2">
        in India
      </Typography>
    </div>
  </div>
);

export default BottomIllustration;
