import { webSDK } from './webSDK';

export const cohortSDK = ({
  handleRedirection,
  goBack,
}: {
  handleRedirection: () => void;
  goBack: () => void;
}) => {
  if (window?.initPWAuthWebSDK) {
    const propConfig = {
      flow: 'cohort',
      webSDK,
      renderType: 'page',
      handleRelativeRedirection: handleRedirection,
      goBack: goBack,
    };
    window?.initPWAuthWebSDK(propConfig);
  }
};
