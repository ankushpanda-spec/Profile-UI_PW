import ErrorBoundary from '@/ErrorBoundary';
import My404NotFound from '@/pages/404NotFound';
import Login from '@/pages/login/ui';
import Profile from '@/pages/Profile';
import StudentMaster from '@/pages/Student-Master-Program';
import Study from '@/pages/Study';
import { Route, Routes } from 'react-router-dom';
import { AuthGuard } from './Guards';

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
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
      </Route>
      <Route path='/login' element={<Login />} />
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
