import { Container } from '@/components';
import { ReactNode } from 'react';

const Base = ({ children }: { children: ReactNode }) => {
  return (
    <Container>{children}</Container>

  );
};

export default Base;
