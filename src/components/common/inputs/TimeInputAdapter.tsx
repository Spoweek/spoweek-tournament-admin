import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
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
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  
  const hourRef = useRef<TextInput>(null);
  const minuteRef = useRef<TextInput>(null);
  const secondRef = useRef<TextInput>(null);

  // Parse existing value on mount and when value changes
  useEffect(() => {
    if (value) {
      const timeParts = value.split(':');
      if (timeParts.length >= 2) {
        let hours = parseInt(timeParts[0]);
        const minutes = timeParts[1];
        const seconds = timeParts[2] || '00';

        if (!use24Hour) {
          if (hours === 0) {
            setHour('12');
            setAmpm('AM');
          } else if (hours <= 12) {
            setHour(hours.toString());
            setAmpm(hours === 12 ? 'PM' : 'AM');
          } else {
            setHour((hours - 12).toString());
            setAmpm('PM');
          }
        } else {
          setHour(hours.toString());
        }

        setMinute(minutes);
        if (showSeconds) {
          setSecond(seconds);
        }
      }
    } else {
      setHour('');
      setMinute('');
      setSecond('');
      setAmpm('AM');
    }
  }, [value, use24Hour, showSeconds]);

  // Initialize animation value based on ampm state (only when not animating)
  useEffect(() => {
    if (!isAnimating) {
      const initialValue = ampm === 'PM' ? 28 : 0;
      slideAnimation.setValue(initialValue);
    }
  }, [ampm, slideAnimation, isAnimating]);


  // Update parent value when individual components change
  const updateTimeValue = (newHour: string, newMinute: string, newSecond: string, newAmpm: string) => {
    // Only update if we have both hour and minute
    if (!newHour || !newMinute) {
      if (!newHour && !newMinute && !newSecond) {
        onChange(''); // Clear if all are empty
      }
      return;
    }

    let finalHour = parseInt(newHour);
    
    // Validate hour
    if (use24Hour) {
      if (finalHour < 0 || finalHour > 23) return;
    } else {
      if (finalHour < 1 || finalHour > 12) return;
    }

    // Validate minute and second
    const minuteInt = parseInt(newMinute);
    if (minuteInt < 0 || minuteInt > 59) return;
    
    if (showSeconds && newSecond) {
      const secondInt = parseInt(newSecond);
      if (secondInt < 0 || secondInt > 59) return;
    }

    if (!use24Hour) {
      if (newAmpm === 'AM' && finalHour === 12) {
        finalHour = 0;
      } else if (newAmpm === 'PM' && finalHour !== 12) {
        finalHour += 12;
      }
    }

    const hourStr = finalHour.toString().padStart(2, '0');
    const minuteStr = newMinute.padStart(2, '0');
    const timeValue = showSeconds 
      ? `${hourStr}:${minuteStr}:${(newSecond || '00').padStart(2, '0')}`
      : `${hourStr}:${minuteStr}`;
    
    onChange(timeValue);
  };

  const handleHourChange = (text: string) => {
    // Only allow digits
    const cleanText = text.replace(/\D/g, '');
    
    // Limit length and value
    let limitedText = cleanText;
    if (use24Hour) {
      limitedText = cleanText.slice(0, 2);
      const num = parseInt(limitedText);
      if (num > 23) limitedText = '23';
    } else {
      limitedText = cleanText.slice(0, 2);
      const num = parseInt(limitedText);
      if (num > 12) limitedText = '12';
      if (num === 0) limitedText = '';
    }
    
    setHour(limitedText);
    updateTimeValue(limitedText, minute, second, ampm);
    
    // Auto-advance to minute field when 2 digits entered
    if (limitedText.length === 2) {
      minuteRef.current?.focus();
    }
  };

  const handleMinuteChange = (text: string) => {
    // Only allow digits
    const cleanText = text.replace(/\D/g, '').slice(0, 2);
    const num = parseInt(cleanText);
    
    let limitedText = cleanText;
    if (num > 59) limitedText = '59';
    
    setMinute(limitedText);
    updateTimeValue(hour, limitedText, second, ampm);
    
    // Auto-advance to second field when 2 digits entered
    if (limitedText.length === 2 && showSeconds) {
      secondRef.current?.focus();
    }
  };

  const handleSecondChange = (text: string) => {
    // Only allow digits
    const cleanText = text.replace(/\D/g, '').slice(0, 2);
    const num = parseInt(cleanText);
    
    let limitedText = cleanText;
    if (num > 59) limitedText = '59';
    
    setSecond(limitedText);
    updateTimeValue(hour, minute, limitedText, ampm);
  };

  const toggleAmPm = () => {
    const newAmpm = ampm === 'AM' ? 'PM' : 'AM';
    setAmpm(newAmpm);
    setIsAnimating(true);
    
    // Animate the slider
    const targetValue = newAmpm === 'PM' ? 28 : 0;
    
    Animated.timing(slideAnimation, {
      toValue: targetValue,
      duration: 200,
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
    const timeValue = showSeconds 
      ? `${hourStr}:${minuteStr}:${(second || '00').padStart(2, '0')}`
      : `${hourStr}:${minuteStr}`;
    
    onChange(timeValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };


  return (
    <View style={[styles.container, style]}>
      <View style={styles.timeInputsContainer}>
        {/* Hour input */}
        <View style={styles.timeUnit}>
          <TextInput
            ref={hourRef}
            style={[styles.timeInput, disabled && styles.disabled]}
            value={hour}
            onChangeText={handleHourChange}
            placeholder={use24Hour ? "HH" : "HH"}
            placeholderTextColor={colors.text.tertiary}
            keyboardType="numeric"
            maxLength={2}
            editable={!disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textAlign="center"
          />
        </View>

        <Text style={styles.separator}>:</Text>

        {/* Minute input */}
        <View style={styles.timeUnit}>
          <TextInput
            ref={minuteRef}
            style={[styles.timeInput, disabled && styles.disabled]}
            value={minute}
            onChangeText={handleMinuteChange}
            placeholder="MM"
            placeholderTextColor={colors.text.tertiary}
            keyboardType="numeric"
            maxLength={2}
            editable={!disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textAlign="center"
          />
        </View>

        {/* Optional seconds input */}
        {showSeconds && (
          <>
            <Text style={styles.separator}>:</Text>
            <View style={styles.timeUnit}>
              <TextInput
                ref={secondRef}
                style={[styles.timeInput, disabled && styles.disabled]}
                value={second}
                onChangeText={handleSecondChange}
                placeholder="SS"
                placeholderTextColor={colors.text.tertiary}
                keyboardType="numeric"
                maxLength={2}
                editable={!disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  timeInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  timeUnit: {
    width: 35,
  },
  timeInput: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.primary,
    paddingHorizontal: 4,
    paddingVertical: 6,
    backgroundColor: 'transparent',
    borderWidth: 0,
    minHeight: 32,
    textAlign: 'center',
    width: 35,
  },
  ampmContainer: {
    marginLeft: 12,
    width: 60,
  },
  ampmSlider: {
    position: 'relative',
    backgroundColor: colors.gray[200],
    borderRadius: 16,
    padding: 2,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ampmSliderBackground: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 28,
    height: 28,
    backgroundColor: colors.primary[500],
    borderRadius: 14,
    zIndex: 1,
  },
  ampmOptions: {
    flexDirection: 'row',
    flex: 1,
    zIndex: 2,
  },
  ampmOption: {
    flex: 1,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ampmText: {
    ...typography.body,
    fontSize: 12,
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
    marginHorizontal: 6,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default TimeInputAdapter;