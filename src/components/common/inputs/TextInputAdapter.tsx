// components/TextInputAdapter.tsx
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import type { InputAdapterProps } from './LabeledField';

const TextInputAdapter: React.FC<InputAdapterProps<string> & TextInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  style,
  ...rest // <- this allows any extra TextInput props
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      editable={!disabled}
      style={[{ paddingVertical: 0 }, style]}
      {...rest} // <- pass all extra props through
    />
  );
};

export default TextInputAdapter;
