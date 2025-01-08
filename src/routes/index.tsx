import {Route, Routes} from 'react-router-dom';
import RouteList from './RouteList';
import Login from '@/pages/login/ui';
import My404NotFound from '@/pages/404NotFound';
import {AuthGuard} from './Guards';
import ErrorBoundary from '@/ErrorBoundary';
import Study from '@/pages/Study';

const Router = () => {
  return (
    <Routes>
      {RouteList}
      <Route element={<AuthGuard />}>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Study />
            </ErrorBoundary>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<My404NotFound />} />
    </Routes>
  );
};

export default Router;
