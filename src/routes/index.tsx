import ErrorBoundary from '@/ErrorBoundary';
import My404NotFound from '@/pages/404NotFound';
import Profile from '@/pages/Profile';
import Study from '@/pages/Study';
import {Route, Routes} from 'react-router-dom';
import Pdf from '@/pages/Pdf';

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
        path="/pdf-viewer/:contentId"
        element={
          
            <div>Hello</div>
          
        }
        loader={({ params }) => {
          console.log(params.contentId);
          return true
        }}
      />
      <Route path="*" element={<My404NotFound />} />
    </Routes>
  );
};

export default Router;
