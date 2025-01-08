import {Route} from 'react-router-dom';
import {AuthGuard} from './Guards';
import ErrorBoundary from '@/ErrorBoundary';
import Profile from '@/pages/Profile';
import StudentMaster from '@/pages/Student-Master-Program';
import MFCOMMON_ROUTES from '@/constants/routes.constants';
import PDFViewer from '@/pages/Pdf-Viewer';

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
     <Route
      path={MFCOMMON_ROUTES.MFCOMMON_PDF_VIEWER}
      element={
        <ErrorBoundary>
          <PDFViewer/>
        </ErrorBoundary>
      }
    />
    </Route>
   
  </>  


);

export default RouteList;
