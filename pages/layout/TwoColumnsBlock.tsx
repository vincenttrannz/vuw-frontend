import React from 'react';
import {Container} from 'react-bootstrap';

const TwoColumnsBlock: React.FC<{ children?: JSX.Element | JSX.Element[], className?: string }> = ({children, className}) => {
  return (
    <Container className={`twoColumnsBlock ${className ? className : ""}`}>
      {children}
    </Container>
  );
};

export default TwoColumnsBlock;
