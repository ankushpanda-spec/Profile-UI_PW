import {fetchUser} from '@/shared/api';
import {useUser} from '@pw-tech/omni-context';
import {ReactNode, useEffect} from 'react';
import Container from '../Container';

const Base = ({children}: {children: ReactNode}) => {
  const {user, setUser} = useUser();
  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const response = await fetchUser();
        if (response) {
          setUser(response);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUser(null);
      }
    };
    fetchAndSetUser();
  }, []);
  return <Container>{children}</Container>;
};

export default Base;
