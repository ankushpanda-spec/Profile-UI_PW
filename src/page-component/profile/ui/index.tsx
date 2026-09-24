import ProfileContainer from '@/features/profile/ui/ProfileContainer';
import ErrorWrapper from '@/shared/context/ErrorContext';
import LoaderWrapper from '@/shared/context/LoaderContext';
import {unleashConfig} from '@/config/unleash.config';
import {useUser} from '@pw-tech/omni-context';
import {ToastProvider} from '@pw-tech/omni-ui';
import {FlagProvider} from '@pw-tech/unleash/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const profileQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
      gcTime: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const ProfileContent = () => {
  return (
    <QueryClientProvider client={profileQueryClient}>
      <ToastProvider>
        <LoaderWrapper>
          <ErrorWrapper>
            <ProfileContainer />
          </ErrorWrapper>
        </LoaderWrapper>
      </ToastProvider>
    </QueryClientProvider>
  );
};

const Profile = () => {
  const {user} = useUser();

  return (
    <FlagProvider
      config={{
        ...unleashConfig,
        context: {
          userId: user?.id,
        },
      }}
    >
      <ProfileContent />
    </FlagProvider>
  );
};

export default Profile;
