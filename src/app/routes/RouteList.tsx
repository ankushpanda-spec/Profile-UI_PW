import MFCOMMON_ROUTES from '@/shared/constants/routes.constants';
import ErrorBoundary from '@/ErrorBoundary';
import { Route } from 'react-router-dom';
import { AuthGuard } from './Guards';
import { Suspense } from 'react';
import ContentLoader from '@/features/shared-mf/content-skeleton/ui';
import { MFELayout } from '@/shared/components';
import PDFViewer from '@/page-component/Pdf-Viewer/ui';
import Profile from '@/page-component/Profile/ui';
import StudentMaster from '@/page-component/Student-Master-Program/ui';

const RouteList = (
  <Route element={<AuthGuard />}>
    <Route
      path={MFCOMMON_ROUTES.MFCOMMON_PROFILE}
      element={
        <Suspense fallback={<ContentLoader/>}>
        <ErrorBoundary>
          <MFELayout title='Profile'>
          <Profile />
          </MFELayout>
        </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path={MFCOMMON_ROUTES.MFCOMMON_STUDENT_MASTER_PROGRAM}
      element={
        <Suspense fallback={<ContentLoader/>}>
        <ErrorBoundary>
          <MFELayout title='Student Master'>
            <StudentMaster />
          </MFELayout>
        </ErrorBoundary>
        </Suspense>
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
