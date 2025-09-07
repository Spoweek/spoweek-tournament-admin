import React, { ReactNode } from 'react';
import Button, { type ButtonProps } from './Button';

export interface PrimaryButtonProps extends Omit<ButtonProps, 'variant' | 'colorName'> {
  children?: ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => {
  return (
    <Button 
      variant="primary" 
      colorName="primary"
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
