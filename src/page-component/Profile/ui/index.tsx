import ErrorWrapper from '@/shared/context/ErrorContext';
import LoaderWrapper from '@/shared/context/LoaderContext';
import ProfileContainer from '@/features/shared-mf/profile/ui/ProfileContainer';
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
