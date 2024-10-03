import {UIState} from '@pw-tech/omni-ui';
import {useNavigate} from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <UIState
      className="w-full"
      title="404 Not Found"
      description="Sorry, we couldn't find the page you're looking for"
      backgroundColor="static-white"
      action={{
        primary: {
          children: 'Back to Homepage',
          size: 'tiny',
          onClick: () => navigate(process.env.PUBLIC_HOME_PAGE_URL),
        },
        secondary: {
          children: 'Reload Page',
          size: 'tiny',
          onClick: () => navigate(0),
        },
      }}
    />
  );
};

export default PageNotFound;
