import webSDK from './webSDK';

const cohortSDK = ({
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
      goBack,
    };
    window?.initPWAuthWebSDK(propConfig);
  }
};
export default cohortSDK;
