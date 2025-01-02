import ErrorWrapper from '@/context/ErrorContext';
import LoaderWrapper from '@/context/LoaderContext';
import SnackbarWrapper from '@/context/SnackbarContext';
import ProfileContainer from '@/features/shared-mf/profile/ui/ProfileContainer';

const Profile = () => {
  return (
    <SnackbarWrapper>
      <LoaderWrapper>
        <ErrorWrapper>
          <ProfileContainer />
        </ErrorWrapper>
      </LoaderWrapper>
    </SnackbarWrapper>
  );
};

export default Profile;
