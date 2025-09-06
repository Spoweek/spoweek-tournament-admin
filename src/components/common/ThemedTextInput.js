import React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { globalStyles } from './GlobalStyles';

const ThemedTextInput = ({ style, ...props }) => {
  return (
    <RNTextInput 
      style={[globalStyles.input, style]} 
      {...props} 
    />
  );
};

export default ThemedTextInput;
