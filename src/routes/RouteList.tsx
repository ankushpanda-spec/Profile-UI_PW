import {Route} from 'react-router-dom';
import {AuthGuard} from './Guards';
import ErrorBoundary from '@/ErrorBoundary';
import Study from '@/pages/Study';
import Profile from '@/pages/Profile';
import Login from '@/pages/login/ui';
import StudentMaster from '@/pages/Student-Master-Program';
import MFCOMMON_ROUTES from '@/constants/routes.constants';

const RouteList = (
  <>
    <Route element={<AuthGuard />}>
      <Route
        path={MFCOMMON_ROUTES.MFCOMMON_PROFILE}
        element={
          <ErrorBoundary>
            <Profile />
          </ErrorBoundary>
        }
      />
      <Route
      path={MFCOMMON_ROUTES.MFCOMMON_STUDENT_MASTER_PROGRAM}
      element={
        <ErrorBoundary>
          <StudentMaster />
        </ErrorBoundary>
      }
    />
    </Route>
   
  </>  


);

export default RouteList;
