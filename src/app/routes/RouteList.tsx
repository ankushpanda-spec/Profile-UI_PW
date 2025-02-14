import * as Sentry from '@sentry/react';
import MFCOMMON_ROUTES from '@/shared/constants/routes.constants';
import {Route} from 'react-router-dom';
import AuthGuard from './Guards';
import {Suspense} from 'react';
import {MFELayout} from '@/shared/components';
import PDFViewer from '@/page-component/pdf-viewer/ui';
import Profile from '@/page-component/profile/ui';
import StudentMaster from '@/page-component/student-master-program/ui';
import ErrorBoundary from '../pages/error-boundary';
import ContentLoader from '@/shared/components/content-skeleton/ui';
import pkVersion from '../../../package.json';

Sentry.init({
  dsn: process.env.PUBLIC_SENTRY_DSN, // Replace with your Sentry project's DSN
  environment: process.env.NODE_ENV,
  release: pkVersion.version,
  integrations: [
    Sentry.browserTracingIntegration(),
    // Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    'https://staging.physicswallah.live/study-v2',
    'https://dev.physicswallah.live/study-v2',
  ],
  // Session Replay
  replaysSessionSampleRate: 0.5,
  replaysOnErrorSampleRate: 0.5,
});

const RouteList = (
  <Route element={<AuthGuard />}>
    <Route
      path={MFCOMMON_ROUTES.MFCOMMON_PROFILE}
      element={
        <Suspense fallback={<ContentLoader />}>
          <ErrorBoundary>
            <MFELayout title="Profile">
              <Profile />
            </MFELayout>
          </ErrorBoundary>
        </Suspense>
      }
    />
    <Route
      path={MFCOMMON_ROUTES.MFCOMMON_STUDENT_MASTER_PROGRAM}
      element={
        <Suspense fallback={<ContentLoader />}>
          <ErrorBoundary>
            <MFELayout title="Student Master">
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
