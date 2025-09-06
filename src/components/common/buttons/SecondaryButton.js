import React from 'react';
import Button from '../Button';

const SecondaryButton = ({ children, ...props }) => {
  return (
    <Button 
      variant="secondary" 
      colorName="primary"
      animationSpeed={2500}
      animationColors={['rgba(62, 114, 251, 0.1)', 'rgba(62, 114, 251, 0.2)']}
      animationAngle={60}
      animationLines={2}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
