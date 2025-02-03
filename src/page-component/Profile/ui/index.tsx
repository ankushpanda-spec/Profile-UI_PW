import ProfileContainer from '@/features/profile/ui/ProfileContainer';
import ErrorWrapper from '@/shared/context/ErrorContext';
import LoaderWrapper from '@/shared/context/LoaderContext';
import { ToastProvider } from '@pw-tech/omni-ui';

const Profile = () => {
  return (
    <ToastProvider>
      <LoaderWrapper>
        <ErrorWrapper>
          <ProfileContainer />
        </ErrorWrapper>
      </LoaderWrapper>
    </ToastProvider>
  );
};

export default Profile;
