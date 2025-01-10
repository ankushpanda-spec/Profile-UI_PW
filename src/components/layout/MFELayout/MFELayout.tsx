import { Container, SubHeader } from "@pw-tech/omni-ui";
import { ReactNode } from "react";
import s from "./index.module.css";
function MFELayout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className={s.mfCommon}>
      <SubHeader
        enableBackButton
        title={title}
        onBackButtonClick={() => { history.back() }}
        className={s.subHeader}
      />
      <div className={s.wrapper}>
        <Container className={s.container}>{children}</Container>
      </div>
    </div>
  );
}

export default MFELayout
