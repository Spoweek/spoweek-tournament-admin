import React from 'react';
import { View, StyleSheet } from 'react-native';
import RadioInput, { RadioOption } from './RadioInput';
import { InputAdapterProps } from './LabeledField';

export interface RadioInputAdapterProps extends InputAdapterProps<string | number | (string | number)[]> {
  options: RadioOption[];
  allowMultiple?: boolean;
  layout?: 'horizontal' | 'vertical';
  description?: string;
}

const RadioInputAdapter: React.FC<RadioInputAdapterProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  style,
  id,
  name,
  options = [],
  allowMultiple = false,
  layout = 'vertical',
  description,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <RadioInput
        options={options}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        id={id}
        name={name}
        allowMultiple={allowMultiple}
        layout={layout}
        description={description}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default RadioInputAdapter;
