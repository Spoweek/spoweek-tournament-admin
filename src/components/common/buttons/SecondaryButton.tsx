import React, { ReactNode } from 'react';
import Button, { type ButtonProps } from '../Button';

export interface SecondaryButtonProps extends Omit<ButtonProps, 'variant' | 'colorName'> {
  children: ReactNode;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, ...props }) => {
  return (
    <Button 
      variant="secondary" 
      colorName="primary"
      {...props}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
