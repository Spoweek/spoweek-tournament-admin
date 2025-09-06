import React, { ReactNode } from 'react';
import Button, { type ButtonProps } from '../Button';

export interface WarningButtonProps extends Omit<ButtonProps, 'variant' | 'colorName'> {
  children: ReactNode;
}

const WarningButton: React.FC<WarningButtonProps> = ({ children, ...props }) => {
  return (
    <Button variant="warning" colorName="warning" {...props}>
      {children}
    </Button>
  );
};

export default WarningButton;
