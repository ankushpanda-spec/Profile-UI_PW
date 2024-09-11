import { useLocation } from 'react-router-dom';

export const showCohortButton = (): boolean => {
  const location = useLocation();  // Get the current URL location

  // Check if the current URL meets the conditions
  return (
    location.pathname.endsWith('/batches') ||
    location.pathname.endsWith('/study') ||
    location.pathname.includes('/library') ||
    location.pathname.includes('/test-series') ||
    location.search.includes('batches?')
  );
};
