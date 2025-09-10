import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography } from '../styles';
import { useFocus } from '../hooks';
import { InputIcon } from '../components';
import type { InputAdapterProps } from './LabeledField';

export interface TimeInputAdapterProps extends InputAdapterProps<string> {
  showSeconds?: boolean;
  use24Hour?: boolean;
  placeholder?: string;
  borderRadius?: 'light' | 'full';
  inline?: boolean;
}

const TimeInputAdapter: React.FC<TimeInputAdapterProps> = ({
  value,
  onChange,
  showSeconds = false,
  use24Hour = true,
  placeholder = 'Select time',
  disabled = false,
  borderRadius = 'light',
  style,
  onFocus,
  onBlur,
  inline = false,
}) => {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [isAnimating, setIsAnimating] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  
  const parseAndSetTime = (timeString: string) => {
    if (!timeString) {
      setHour('');
      setMinute('');
      setSecond('');
      setAmpm('AM');
      return;
    }
  
    const timeParts = timeString.split(':');
    if (timeParts.length < 2) return;
  
    let hours = parseInt(timeParts[0]);
    const minutes = timeParts[1];
    const seconds = timeParts[2] || '00';
  
    if (use24Hour) {
      // 24-hour format: just set the hour directly
      setHour(hours.toString().padStart(2, '0'));
    } else {
      // 12-hour format: convert 24-hour to 12-hour
      if (hours === 0) {
        setHour('12');
        setAmpm('AM');
      } else if (hours < 12) {
        setHour(hours.toString().padStart(2, '0'));
        setAmpm('AM');
      } else if (hours === 12) {
        setHour('12');
        setAmpm('PM');
      } else {
        setHour((hours - 12).toString().padStart(2, '0'));
        setAmpm('PM');
      }
    }
  
    setMinute(minutes.padStart(2, '0'));
    if (showSeconds) {
      setSecond(seconds.padStart(2, '0'));
    } else {
      setSecond('00'); // Always store seconds as 00 when not showing
    }
  };
  
  // Initialize fields when component mounts or value changes
  useEffect(() => {
    parseAndSetTime(value);
  }, [value, use24Hour, showSeconds]);

  // Initialize animation value based on ampm state (only when not animating)
  useEffect(() => {
    if (!isAnimating) {
      const initialValue = ampm === 'PM' ? 21 : 0;
      slideAnimation.setValue(initialValue);
    }
  }, [ampm, slideAnimation, isAnimating]);

  const validateAndUpdateHour = (text: string) => {
    // Only allow digits
    const cleanText = text.replace(/\D/g, '');
    
    // Limit to 2 characters max
    const limitedText = cleanText.slice(0, 2);
    
    if (limitedText === '') {
      setHour('');
      return;
    }
    
    const num = parseInt(limitedText);
    
    if (use24Hour) {
      // 24-hour format: 0-23
      if (num > 23) {
        return;
      } else {
        setHour(limitedText);
      }
    } else {
      // 12-hour format: 1-12
      if (num === 0) {
        setHour('');
      } else if (num > 12) {
        return;
      } else {
        setHour(limitedText);
      }
    }
  };

  const updateParentValue = () => {
    let finalHour = parseInt(hour);
    if (!use24Hour) {
      if (ampm === 'PM') {
        if (finalHour === 12) {
          finalHour = parseInt(hour);
        } else {
          finalHour = parseInt(hour) + 12;
        }
      } else if (ampm === 'AM' && finalHour === 12) {
        finalHour = 0;
      }
    }
    if (finalHour > 23) {
      finalHour = 0;
      setHour('00');
    }
    let finalMinute = minute;
    let finalSecond = second;
    value = `${finalHour.toString().padStart(2, '0')}:${finalMinute.toString().padStart(2, '0')}:${finalSecond.toString().padStart(2, '0')}`;
    if (hour !== '' && minute !== '' && (showSeconds ? second !== '' : true)) {
        onChange(value);
    }
  };

  const handleTimeFieldInputBlur = (fieldType: 'hour' | 'minute' | 'second') => {
    let normalizedValue = '';
    
    switch (fieldType) {
      case 'hour':
        normalizedValue = hour ? hour.padStart(2, '0') : '';
        setHour(normalizedValue);
        break;
      case 'minute':
        normalizedValue = minute ? minute.padStart(2, '0') : '';
        setMinute(normalizedValue);
        break;
      case 'second':
        normalizedValue = second ? second.padStart(2, '0') : '';
        setSecond(normalizedValue);
        break;
    }
    
    // Only update parent if we have valid time values
    if (hour !== '' && minute !== '' && (showSeconds ? second !== '' : true)) {
      updateParentValue();
    }
  };

  const validateAndUpdateMinute = (text: string) => {
    // Only allow digits
    const cleanText = text.replace(/\D/g, '');
    
    // Limit to 2 characters max
    const limitedText = cleanText.slice(0, 2);
    
    if (limitedText === '') {
      setMinute('');
      return;
    }
    
    const num = parseInt(limitedText);
    if (num === 0) {
        setMinute('');
    } else if (num > 60) {
        return;
    } else {
        setMinute(limitedText);
    }
  };

  const validateAndUpdateSecond = (text: string) => {
    // Only allow digits
    const cleanText = text.replace(/\D/g, '');
    
    // Limit to 2 characters max
    const limitedText = cleanText.slice(0, 2);
    
    if (limitedText === '') {
      setSecond('');
      return;
    }
    
    const num = parseInt(limitedText);
    if (num === 0) {
        setSecond('');
    } else if (num > 60) {
        return;
    } else {
        setSecond(limitedText);
    }
  };

  const toggleAmPm = () => {
    const newAmpm = ampm === 'AM' ? 'PM' : 'AM';
    setAmpm(newAmpm);
    setIsAnimating(true);
    
    // Animate the slider
    const targetValue = newAmpm === 'PM' ? 21 : 0;
    
    Animated.timing(slideAnimation, {
      toValue: targetValue,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      setIsAnimating(false);
    });
    
    // Update the time value with the new ampm value
    if (!hour || !minute) {
      return; // Don't update if we don't have hour and minute
    }

    let finalHour = parseInt(hour);
    
    if (!use24Hour) {
      if (newAmpm === 'AM' && finalHour === 12) {
        finalHour = 0;
      } else if (newAmpm === 'PM' && finalHour !== 12) {
        finalHour += 12;
      }
    }

    const hourStr = finalHour.toString().padStart(2, '0');
    const minuteStr = minute.padStart(2, '0');
    const timeValue = `${hourStr}:${minuteStr}:${(second || '00').padStart(2, '0')}`;
    
    onChange(timeValue);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.timeInputsContainer}>
        {/* Clock icon */}
        <InputIcon name="time-outline" />
        
        {/* Hour input */}
        <View style={styles.timeUnit}>
          <TextInput
            style={[styles.timeInput, disabled && styles.disabled]}
            value={hour}
            onChangeText={validateAndUpdateHour}
            onBlur={() => handleTimeFieldInputBlur('hour')}
            placeholder="--"
            placeholderTextColor={colors.text.tertiary}
            keyboardType="numeric"
            maxLength={2}
            editable={!disabled}
            textAlign="center"
          />
        </View>

        <Text style={styles.separator}>:</Text>

        {/* Minute input */}
        <View style={styles.timeUnit}>
          <TextInput
            style={[styles.timeInput, disabled && styles.disabled]}
            value={minute}
            onChangeText={validateAndUpdateMinute}
            onBlur={() => handleTimeFieldInputBlur('minute')}
            placeholder="--"
            placeholderTextColor={colors.text.tertiary}
            keyboardType="numeric"
            maxLength={2}
            editable={!disabled}
            textAlign="center"
          />
        </View>

        {/* Optional seconds input */}
        {showSeconds && (
          <>
            <Text style={styles.separator}>:</Text>
            <View style={styles.timeUnit}>
              <TextInput
                style={[styles.timeInput, disabled && styles.disabled]}
                value={second}
                onChangeText={validateAndUpdateSecond}
                onBlur={() => handleTimeFieldInputBlur('second')}
                placeholder="--"
                placeholderTextColor={colors.text.tertiary}
                keyboardType="numeric"
                maxLength={2}
                editable={!disabled}
                textAlign="center"
              />
            </View>
          </>
        )}

        {/* AM/PM toggle for 12-hour format */}
        {!use24Hour && (
          <TouchableOpacity 
            style={styles.ampmContainer}
            onPress={toggleAmPm}
            disabled={disabled}
            activeOpacity={1}
          >
            <View style={[styles.ampmSlider, disabled && styles.disabled]}>
              <Animated.View style={[styles.ampmSliderBackground, { 
                transform: [{ translateX: slideAnimation }] 
              }]} />
              <View style={styles.ampmOptions}>
                <View style={styles.ampmOption}>
                  <Text style={[styles.ampmText, ampm === 'AM' && styles.ampmTextActive]}>AM</Text>
                </View>
                <View style={styles.ampmOption}>
                  <Text style={[styles.ampmText, ampm === 'PM' && styles.ampmTextActive]}>PM</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  timeUnit: {
    width: 28,
  },
  timeInput: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.primary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    textAlign: 'center',
    width: 28,
  },
  ampmContainer: {
    marginLeft: 8,
    width: 45,
  },
  ampmSlider: {
    position: 'relative',
    backgroundColor: colors.gray[200],
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    padding: 2,
  },
  ampmSliderBackground: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 20,
    height: 20,
    backgroundColor: colors.primary[500],
    borderRadius: 10,
    zIndex: 1,
  },
  ampmOptions: {
    flexDirection: 'row',
    flex: 1,
    zIndex: 2,
  },
  ampmOption: {
    flex: 1,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ampmText: {
    ...typography.body,
    fontSize: 10,
    color: colors.text.secondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  ampmTextActive: {
    color: colors.text.inverse,
  },
  separator: {
    ...typography.body,
    fontSize: 16,
    color: colors.text.primary,
    marginHorizontal: 4,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default TimeInputAdapter;