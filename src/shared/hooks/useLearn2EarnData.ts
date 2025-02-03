import {useState, useEffect} from 'react';
import { learn2earnData } from '@/features/shared-mf/profile/api';


export const useLearn2EarnData = (cohortId:string): any => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response:any = await learn2earnData(cohortId);
        setData(response);
      } catch (err) {
        setError('Failed to fetch Learn2Earn data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {data, loading, error};
};
