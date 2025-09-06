import React from 'react';
import Button from '../Button';

const PrimaryButton = ({ children, ...props }) => {
  return (
    <Button 
      variant="primary" 
      colorName="primary"
      animationSpeed={1500}
      animationColors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.15)']}
      animationAngle={30}
      animationLines={4}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
