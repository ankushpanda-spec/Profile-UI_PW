import ProfileContainer from '@/features/profile/ui/ProfileContainer';
import ErrorWrapper from '@/shared/context/ErrorContext';
import LoaderWrapper from '@/shared/context/LoaderContext';
import {ToastProvider} from '@pw-tech/omni-ui';
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

const Profile = () => {
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

export default Profile;
