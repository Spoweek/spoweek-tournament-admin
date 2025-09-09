// components/TextInputAdapter.tsx
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import type { InputAdapterProps } from './LabeledField';

// Create a type that omits the conflicting onChange from TextInputProps
type TextInputAdapterProps = Omit<TextInputProps, 'onChange'> & InputAdapterProps<string>;

const TextInputAdapter: React.FC<TextInputAdapterProps> = ({
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
      style={style}
      {...rest} // <- pass all extra props through
    />
  );
};

export default TextInputAdapter;
