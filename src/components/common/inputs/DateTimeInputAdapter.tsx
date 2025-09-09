import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import type { InputAdapterProps } from './LabeledField';
import TimeInputAdapter from './TimeInputAdapter';
import DateInputAdapter from './DateInputAdapter';

export interface DateTimeInputAdapterProps extends InputAdapterProps<string> {
  placeholder?: string;
  borderRadius?: 'light' | 'full';
  inline?: boolean;
  showSeconds?: boolean;
  use24Hour?: boolean;
  onDropdownStateChange?: (isOpen: boolean) => void;
  containerRef?: React.RefObject<any>;
  calculatedRadius?: number;
}

const DateTimeInputAdapter: React.FC<DateTimeInputAdapterProps> = ({
  value = '',
  onChange,
  placeholder = 'Select date and time',
  disabled = false,
  borderRadius = 'light',
  style,
  onFocus,
  onBlur,
  onDropdownStateChange,
  inline = false,
  showSeconds = false,
  use24Hour = true,
  calculatedRadius,
  containerRef,
}) => {
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [isTimeFocused, setIsTimeFocused] = useState(false);
  const [isDateFocused, setIsDateFocused] = useState(false);

  // Parse the combined datetime value - use useMemo to prevent unnecessary re-parsing
  const parsedValues = useMemo(() => {
    if (value) {
      // Expected format: "2024/01/15 14:30:00" or "2024/01/15 14:30"
      const parts = value.split(' ');
      if (parts.length === 2) {
        return {
          dateValue: parts[0], // "2024/01/15"
          timeValue: parts[1], // "14:30:00" or "14:30"
        };
      }
    }
    return { dateValue: '', timeValue: '' };
  }, [value]);

  // Update parent value when date or time changes
  const updateParentValue = useCallback((newDate: string, newTime: string) => {
    if (newDate && newTime) {
      const combinedValue = `${newDate} ${newTime}`;
      onChange?.(combinedValue);
    } else if (newDate || newTime) {
      // If only one part is filled, still call onChange with partial value
      const combinedValue = `${newDate || ''} ${newTime || ''}`.trim();
      onChange?.(combinedValue);
    } else {
      onChange?.('');
    }
  }, [onChange]);

  const handleDateChange = useCallback((newDate: string) => {
    setDateValue(newDate);
    updateParentValue(newDate, timeValue);
  }, [timeValue, updateParentValue]);

  const handleTimeChange = useCallback((newTime: string) => {
    setTimeValue(newTime);
    updateParentValue(dateValue, newTime);
  }, [dateValue, updateParentValue]);

  const handleDateFocus = useCallback(() => {
    setIsDateFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleDateBlur = useCallback(() => {
    setIsDateFocused(false);
    onBlur?.();
  }, [onBlur, isTimeFocused]);

  const handleTimeFocus = useCallback(() => {
    setIsTimeFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleTimeBlur = useCallback(() => {
    setIsTimeFocused(false);
    onBlur?.();
  }, [onBlur, isDateFocused]);

  const handleDateDropdownStateChange = useCallback((isOpen: boolean) => {
    onDropdownStateChange?.(isOpen);
  }, [onDropdownStateChange]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.timeContainer}>
        <TimeInputAdapter
          value={timeValue}
          onChange={handleTimeChange}
          disabled={disabled}
          borderRadius={borderRadius}
          inline={inline}
          showSeconds={showSeconds}
          use24Hour={use24Hour}
          onFocus={handleTimeFocus}
          onBlur={handleTimeBlur}
          style={styles.timeInput}
        />
      </View>
      
      <View style={styles.dateContainer}>
        <DateInputAdapter
          value={dateValue}
          onChange={handleDateChange}
          disabled={disabled}
          borderRadius={borderRadius}
          inline={inline}
          onFocus={handleDateFocus}
          onBlur={handleDateBlur}
          onDropdownStateChange={handleDateDropdownStateChange}
          calculatedRadius={calculatedRadius}
          containerRef={containerRef}
          style={styles.dateInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  timeContainer: {
    flexGrow: 0,        // Don't grow - use content width
    flexShrink: 0,      // Don't shrink - maintain content width
    flexBasis: 'auto',  // Use content width
    minWidth: '50%',    // Minimum 50% of available width
    marginRight: 8,
  },
  dateContainer: {
    flexGrow: 1,        // Fill remaining space
    flexShrink: 1,      // Can shrink when space is tight
    flexBasis: 'auto',  // Start with content width
    minWidth: 80,       // Minimum width to ensure it can shrink
  },
  timeInput: {
    // Remove any conflicting styles that might interfere with inline layout
  },
  dateInput: {
    // Remove any conflicting styles that might interfere with inline layout
  },
});

export default DateTimeInputAdapter;
