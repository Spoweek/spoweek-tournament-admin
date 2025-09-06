import React from 'react';
import Button from '../Button';

const WarningButton = ({ children, ...props }) => {
  return (
    <Button variant="warning" {...props}>
      {children}
    </Button>
  );
};

export default WarningButton;
