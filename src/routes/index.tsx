import {Route, Routes} from 'react-router-dom';
import Study from '@/pages/Study';
import My404NotFound from '@/pages/404NotFound';
import ErrorBoundary from '@/ErrorBoundary';


const Router = () => {
  return (
    <Routes>
      <Route
        path="/study"
        element={
          <ErrorBoundary>
            <Study></Study>
          </ErrorBoundary>
        }
      />
      <Route  path='*' element={<My404NotFound/>} />
    </Routes>
  );
};

export default Router;
