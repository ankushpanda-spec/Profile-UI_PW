import {Container, SubHeader} from '@pw-tech/omni-ui';
import {ReactNode} from 'react';
import s from './index.module.css';
import {useNavigate} from 'react-router-dom';

function MFELayout({children, title}: {children: ReactNode; title: string}) {
  const navigate = useNavigate();
  return (
    <div className={s.mfCommon}>
      <SubHeader
        enableBackButton
        title={title}
        onBackButtonClick={() => {
          navigate(-1);
        }}
        className={s.subHeader}
      />
      <div className={s.wrapper}>
        <Container className={s.container}>{children}</Container>
      </div>
    </div>
  );
}

export default MFELayout;
