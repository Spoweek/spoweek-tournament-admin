import React from 'react';
import Button from '../Button';

const PrimaryButton = ({ children, ...props }) => {
  return (
    <Button variant="primary" {...props}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
