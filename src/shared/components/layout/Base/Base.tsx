import fetchUser from '@/shared/api/user';
import {useUser} from '@pw-tech/omni-context';
import {ReactNode, useEffect} from 'react';
import Container from '../container';

const Base = ({children}: {children: ReactNode}) => {
  const {setUser} = useUser();
  useEffect(() => {
    const fetchAndSetUser = async () => {
      const response = await fetchUser();
      if (response) {
        setUser(response);
      } else {
        setUser(null);
      }
    };
    fetchAndSetUser();
  }, []);
  return <Container>{children}</Container>;
};

export default Base;
