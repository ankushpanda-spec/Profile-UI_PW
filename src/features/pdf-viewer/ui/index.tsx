import {useState, useEffect} from 'react';
import {PdfViewer} from '@pw-tech/omni-ui';
import {useSearchParams} from 'react-router-dom';
import getPdfDetails from '../api';
import {PdfDetails} from '../types';

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
      setError('Invalid request');
      setLoading(false);
    }
    if (url) {
      const decodedUrl = atob(url);
      if (
        decodedUrl.startsWith('http://') ||
        decodedUrl.startsWith('https://')
      ) {
        setPdfUrl(decodedUrl);
      } else {
        setPdfUrl(url);
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
            setError('No data available.');
          }
        } catch (_error) {
          setError('Failed to load PDF.');
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    } else {
      setError('Invalid request');
      setLoading(false);
    }
  }, [contentId, url]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <PdfViewer pdfFile={pdfUrl} title={pdfTitle} isLoading={loading} />;
};

export default PdfContainer;
