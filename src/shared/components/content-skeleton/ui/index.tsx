import {Loader, Typography} from '@pw-tech/omni-ui';
import s from '../styles/index.module.css';

function ContentLoader() {
  return (
    <div className={s.container}>
      <Loader size="medium" />
      <Typography color="primary">Loading....</Typography>
    </div>
  );
}

export default ContentLoader;
