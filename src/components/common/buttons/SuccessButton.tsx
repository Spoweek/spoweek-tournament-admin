import React, { ReactNode } from 'react';
import Button, { type ButtonProps } from '../Button';

export interface SuccessButtonProps extends Omit<ButtonProps, 'variant' | 'colorName'> {
  children: ReactNode;
}

const SuccessButton: React.FC<SuccessButtonProps> = ({ children, ...props }) => {
  return (
    <Button variant="success" colorName="success" {...props}>
      {children}
    </Button>
  );
};

export default SuccessButton;
