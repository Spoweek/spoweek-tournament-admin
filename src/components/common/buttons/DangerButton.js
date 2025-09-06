import React from 'react';
import Button from '../Button';

const DangerButton = ({ children, ...props }) => {
  return (
    <Button variant="danger" {...props}>
      {children}
    </Button>
  );
};

export default DangerButton;
