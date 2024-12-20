import ErrorBoundary from '@/ErrorBoundary';
import My404NotFound from '@/pages/404NotFound';
import Profile from '@/pages/Profile';
import StudentMaster from '@/pages/Student-Master-Program';
import Study from '@/pages/Study';
import {Route, Routes} from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <Study />
          </ErrorBoundary>
        }
      />
      <Route
        path="/profile"
        element={
          <ErrorBoundary>
            <Profile />
          </ErrorBoundary>
        }
      />
      <Route
        path="/student-master-program"
        element={
          <ErrorBoundary>
            <StudentMaster/>
          </ErrorBoundary>
        }
      />
      <Route path="*" element={<My404NotFound />} />
    </Routes>
  );
};

export default Router;
