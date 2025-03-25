import {useState, useEffect} from 'react';
import {PdfViewer, Typography} from '@pw-tech/omni-ui';
import {useSearchParams} from 'react-router-dom';
import getPdfDetails from '../api';
import {PdfDetails} from '../types';
import s from '../styles/index.module.css';

const PdfContainer = () => {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [pdfTitle, setPdfTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchParams] = useSearchParams();
  const contentId = searchParams.get('contentId')?.toString();
  const url = searchParams.get('pdf');

  useEffect(() => {
    if (url && contentId) {
      setError(
        'Invalid request: Both URL and content ID are provided. Please provide only one.'
      );
      setLoading(false);
    }
    if (url) {
      try {
        // Check if the URL is base64 encoded
        const base64Regex = /^[A-Za-z0-9+/=]+$/;
        if (base64Regex.test(url)) {
          const decodedUrl = atob(url);
          if (
            decodedUrl.startsWith('http://') ||
            decodedUrl.startsWith('https://')
          ) {
            setPdfUrl(decodedUrl);
          } else {
            setPdfUrl(url);
          }
        } else {
          // If the URL is not base64 encoded, assume it is URL-encoded
          const decodedUrl = decodeURIComponent(url);
          setPdfUrl(decodedUrl);
        }
      } catch (_e) {
        // If decoding fails, use the original URL
        setError('Failed to decode the URL. Please provide a valid URL.');
      }
      setLoading(false);
      return;
    }
    if (contentId) {
      async function fetchData() {
        try {
          const res: PdfDetails[] = await getPdfDetails({}, contentId);
          if (res) {
            const pdfDetails = res[0];
            const baseUrl = pdfDetails.content[0]?.fileId.baseUrl || '';
            const key = pdfDetails.content[0]?.fileId.key || '';
            const src = baseUrl + key;
            setPdfUrl(src);
            setPdfTitle(pdfDetails.title);
          } else {
            setError('No PDF details available for the provided content ID.');
          }
        } catch (_error) {
          setError(
            'An error occurred while loading the PDF. Please try again later.'
          );
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    } else {
      setError('Invalid request: Please provide either a URL or a content ID.');
      setLoading(false);
    }
  }, [contentId, url]);

  if (error) {
    return (
      <div className={s.errorWrapper}>
        <div className={s.errorContainer}>
          <div>
            <h1 className={s.heading}>Something went wrong.</h1>
            <Typography weight="bold">Error: </Typography>
            <Typography>{error}</Typography>
          </div>
        </div>
      </div>
    );
  }

  return <PdfViewer pdfFile={pdfUrl} title={pdfTitle} isLoading={loading} />;
};

export default PdfContainer;
