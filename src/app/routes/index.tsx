import {Route, Routes} from 'react-router-dom';
import RouteList from './RouteList';
import Login from '@/page-component/login/ui';
import AuthGuard from './Guards';
import Study from '@/page-component/Study-temp/ui';
import ErrorBoundary from '../pages/error-boundary';
import My404NotFound from '../pages/not-found';

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
