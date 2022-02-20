import React from 'react';
import {Container} from 'react-bootstrap';

const TwoColumnsBlock: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({children}) => {
  return (
    <Container className='twoColumnsBlock'>
      {children}
    </Container>
  );
};

export default TwoColumnsBlock;
