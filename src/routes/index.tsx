import ErrorBoundary from '@/ErrorBoundary';
import My404NotFound from '@/pages/404NotFound';
import Profile from '@/pages/Profile';
import Study from '@/pages/Study';
import { Route, Routes } from 'react-router-dom';


const Router = () => {
  console.log('HERE')
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
      <Route path='*' element={<My404NotFound />} />
    </Routes>
  );
};

export default Router;
