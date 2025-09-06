import React from 'react';
import Button from '../Button';

const SuccessButton = ({ children, ...props }) => {
  return (
    <Button variant="success" {...props}>
      {children}
    </Button>
  );
};

export default SuccessButton;
