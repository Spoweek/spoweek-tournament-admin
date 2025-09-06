import React from 'react';
import TextInput from '../TextInput';

const AboveLabelInput = ({ children, ...props }) => {
  return (
    <TextInput 
      labelPosition="above"
      {...props}
    >
      {children}
    </TextInput>
  );
};

export default AboveLabelInput;
