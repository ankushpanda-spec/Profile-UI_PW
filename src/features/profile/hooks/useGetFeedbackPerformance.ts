import {doubtSolvingFeedbackData} from '@/features/profile/api';
import {
  doubtSolvingFeedbackDataResponse,
  FeedbackData,
} from '@/features/profile/types';
import {useState, useEffect} from 'react';

interface UseFeedbackDataResult {
  data: FeedbackData | null;
  loading: boolean;
  error: string | null;
}
const useFeedbackData = (): UseFeedbackDataResult => {
  const [data, setData] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: doubtSolvingFeedbackDataResponse =
          await doubtSolvingFeedbackData();
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch feedback data');
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {data, loading, error};
};
export default useFeedbackData;
