import React from 'react';
import Button from '../Button';

const DangerButton = ({ children, ...props }) => {
  return (
    <Button variant="danger" colorName="error" {...props}>
      {children}
    </Button>
  );
};

export default DangerButton;
