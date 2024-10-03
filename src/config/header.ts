import {useLocation} from 'react-router-dom';

export const shouldDisplayCohortButton = (): boolean => {
  const location = useLocation(); // Get the current URL location

  // Check if the current URL meets the conditions
  return (
    location.pathname.endsWith('/batches') ||
    location.pathname.endsWith('/study') ||
    location.pathname.includes('/library') ||
    location.pathname.includes('/test-series') ||
    location.search.includes('batches?')
  );
};

export const shouldDisplayBackButton = (): boolean => {
  const location = useLocation(); // Get the current URL location
  const url = location.pathname;
  const search = location.search;

  return (
    (url !== '/dashboard' &&
      url !== '/doubts-connect/summary' &&
      !url.includes('test-series') &&
      !url.includes('test-list') &&
      url !== '/library' &&
      !url.includes('after-payment') &&
      url !== '/contact-us-public' &&
      url !== '/privacy-policy' &&
      url !== '/refund-policy' &&
      url !== '/under-maintenance' &&
      !url.endsWith('/chat') &&
      url !== '/school-contact-program' &&
      !url.includes('saarthi') &&
      !search.includes('batches?')) ||
    url === '/student-master-program'
  );
};
