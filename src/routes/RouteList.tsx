import { MFELayout } from '@/components';
import MFCOMMON_ROUTES from '@/constants/routes.constants';
import ErrorBoundary from '@/ErrorBoundary';
import PDFViewer from '@/pages/Pdf-Viewer';
import Profile from '@/pages/Profile';
import StudentMaster from '@/pages/Student-Master-Program';
import { Route } from 'react-router-dom';
import { AuthGuard } from './Guards';

const RouteList = (
  <Route element={<AuthGuard />}>
    <Route
      path={MFCOMMON_ROUTES.MFCOMMON_PROFILE}
      element={
        <ErrorBoundary>
          <MFELayout title='Profile'>
            <Profile />
          </MFELayout>
        </ErrorBoundary>
      }
    />
    <Route
      path={MFCOMMON_ROUTES.MFCOMMON_STUDENT_MASTER_PROGRAM}
      element={
        <ErrorBoundary>
          <MFELayout title='Student Master'>
            <StudentMaster />
          </MFELayout>
        </ErrorBoundary>
      }
    />
    <Route
      path={MFCOMMON_ROUTES.MFCOMMON_PDF_VIEWER}
      element={
        <ErrorBoundary>
          <PDFViewer />
        </ErrorBoundary>
      }
    />
  </Route>
);

export default RouteList;
