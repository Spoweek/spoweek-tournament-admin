import React from 'react';
import { Text as RNText } from 'react-native';
import { globalStyles } from './GlobalStyles';

const ThemedText = ({ style, ...props }) => {
  return (
    <RNText 
      style={[globalStyles.text, style]} 
      {...props} 
    />
  );
};

export default ThemedText;
