import {useState, useEffect} from 'react';
import {doubtSolvingFeedbackData} from '@/shared/api'; // Assuming you have the function in the api folder

interface FeedbackData {
  satisfactoryRate: number;
  totalSolved: number;
  totalRated: number;
}

interface UseFeedbackDataResult {
  data: FeedbackData | null;
  loading: boolean;
  error: string | null;
}

export const useFeedbackData = (): UseFeedbackDataResult => {
  const [data, setData] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: any = await doubtSolvingFeedbackData();
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch feedback data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {data, loading, error};
};
