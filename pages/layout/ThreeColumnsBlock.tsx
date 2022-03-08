import React from 'react';
import {Container} from 'react-bootstrap';

const ThreeColumnsBlock: React.FC<{ children?: JSX.Element | JSX.Element[], className?: string}> = ({children, className}) => {
  return (
    <Container className={`threeColumnsBlock ${className ? className : ""}`}>
      {children}
    </Container>
  );
};

export default ThreeColumnsBlock;