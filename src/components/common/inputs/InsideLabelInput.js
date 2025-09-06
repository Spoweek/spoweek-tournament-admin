import React from 'react';
import TextInput from '../TextInput';

const InsideLabelInput = ({ children, ...props }) => {
  return (
    <TextInput 
      labelPosition="inside"
      {...props}
    >
      {children}
    </TextInput>
  );
};

export default InsideLabelInput;
