import React, { ReactNode } from 'react';
import Button, { type ButtonProps } from './Button';

export interface DangerButtonProps extends Omit<ButtonProps, 'variant' | 'colorName'> {
  children?: ReactNode;
}

const DangerButton: React.FC<DangerButtonProps> = ({ children, ...props }) => {
  return (
    <Button variant="error" colorName="error" {...props}>
      {children}
    </Button>
  );
};

export default DangerButton;
