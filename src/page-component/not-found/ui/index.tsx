// import { DoctorHero } from '@/shared/assets/icons';
import {Button, Typography} from '@pw-tech/omni-ui';
import {useNavigate} from 'react-router-dom';
import styles from '../styles/index.module.css'; // Import the CSS module

import {DoctorHero} from '@/shared/assets/icons';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* <DoctorHero className={styles.heroIcon} width={240} height={240} /> */}
      <DoctorHero width={240} height={240} />

      <div className={styles.parent}>
        <div className={styles.content}>
          <Typography
            variant="heading4"
            color="text-heading"
            weight="bold"
            className={styles.heading}
          >
            Lost your way? We&apos;re here to guide you
          </Typography>
          <Typography
            variant="regular"
            color="text-body-1"
            weight="medium"
            className={styles.description}
          >
            Our hero is here to help you get back on the right track
          </Typography>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="secondary"
            className={styles.button}
            onClick={() => navigate('/')}
          >
            Back to HomePage
          </Button>
          <Button
            variant="primary"
            className={styles.button}
            onClick={() => navigate(0)}
          >
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
