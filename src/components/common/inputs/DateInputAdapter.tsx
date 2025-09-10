import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography, uiLayers } from '../styles';
import { useDropdown, useHover } from '../hooks';
import { ModalOverlay, DropdownContainer, InputIcon, ChevronIcon } from '../components';
import type { InputAdapterProps } from './LabeledField';

export interface DateInputAdapterProps extends InputAdapterProps<string> {
  placeholder?: string;
  borderRadius?: 'light' | 'full';
  inline?: boolean;
  onDropdownStateChange?: (isOpen: boolean) => void;
  containerRef?: React.RefObject<any>;
  calculatedRadius?: number;
}

const DateInputAdapter: React.FC<DateInputAdapterProps> = ({
  value = '',
  onChange,
  placeholder = '----/--/--',
  disabled = false,
  borderRadius = 'light',
  style,
  onFocus,
  onBlur,
  onDropdownStateChange,
  inline = false,
  calculatedRadius,
  containerRef,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayDate, setDisplayDate] = useState<string>(value || '');
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [calculatedHeight, setCalculatedHeight] = useState(400);
  const [contentHeight, setContentHeight] = useState(0);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const dateRef = useRef<any>(null);
  const calendarContentRef = useRef<any>(null);

  // Use shared hooks
  const { isOpen: isCalendarOpen, dropdownLayout, openDropdown, closeDropdown } = useDropdown({
    onDropdownStateChange,
    containerRef,
    borderRadius,
  });

  // Use the calculated radius from LabeledField for perfect matching
  const getDropdownRadius = () => {
    // Use the radius calculated by LabeledField if available
    if (calculatedRadius !== undefined) {
      return calculatedRadius;
    }
    // Fallback to original logic
    if (borderRadius === 'full') {
      return dropdownLayout.height / 2;
    }
    return 8; // Default light radius
  };

  // Handle content layout measurement
  const handleContentLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
    // Add some padding for the dropdown container
    setCalculatedHeight(height);
  };

  // Parse initial value on mount
  useEffect(() => {
    if (value && value.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
      const [year, month, day] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        setCurrentMonth(month - 1);
        setCurrentYear(year);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  // Reset content height when calendar opens to ensure fresh measurement
  useEffect(() => {
    if (isCalendarOpen) {
      setContentHeight(0);
      setCalculatedHeight(400); // Fallback height
    }
  }, [isCalendarOpen]);

  // Update display when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}/${month}/${day}`;
      setDisplayDate(formattedDate);
    } else {
      setDisplayDate('');
    }
  }, [selectedDate]);

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    closeDropdown();
    onBlur?.();
    
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(newDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}/${month}/${dayStr}`;
    
    onChange?.(formattedDate);
  };

  const handleOpen = () => {
    if (!disabled) {
      openDropdown();
    }
  };

  const handleClose = () => {
    closeDropdown();
    onBlur?.();
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleYearChange = (direction: 'prev' | 'next') => {
    setCurrentYear(direction === 'prev' ? currentYear - 1 : currentYear + 1);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && 
                        selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentMonth && 
                        selectedDate.getFullYear() === currentYear;
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentMonth && 
                     new Date().getFullYear() === currentYear;
      const isHovered = hoveredDay === day;

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            isSelected && styles.selectedDay,
            isToday && !isSelected && styles.todayDay,
            isHovered && !isSelected && styles.hoveredDay,
          ]}
          onPress={() => handleDateSelect(day)}
          {...(Platform.OS === 'web' ? {
            onMouseEnter: () => setHoveredDay(day),
            onMouseLeave: () => setHoveredDay(null)
          } : {})}
        >
          <Text
            style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isToday && !isSelected && styles.todayDayText,
              isHovered && !isSelected && styles.hoveredDayText,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        ref={dateRef}
        style={[
          styles.inputContainer,
          disabled && styles.disabledInput,
          style
        ]}
        onPress={handleOpen}
        disabled={disabled}
        activeOpacity={1}
      >
        <InputIcon name="calendar-outline" />
        <Text style={[
          styles.inputText,
          (!displayDate || displayDate === '') && styles.placeholderText,
          disabled && styles.disabledText
        ]}>
          {displayDate || placeholder}
        </Text>
        <ChevronIcon 
          isOpen={isCalendarOpen}
          disabled={disabled}
        />
      </TouchableOpacity>

      <ModalOverlay
        visible={isCalendarOpen}
        onClose={handleClose}
      >
        <DropdownContainer
          layout={dropdownLayout}
          borderRadius={getDropdownRadius()}
          contentHeight={contentHeight > 0 ? contentHeight : calculatedHeight}
          dynamicHeight={true}
          maxHeight={400}
        >
          <View 
            ref={calendarContentRef}
            style={styles.calendarContainer}
            onLayout={handleContentLayout}
          >
              <View style={styles.calendarHeader}>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    hoveredNav === 'year-prev' && styles.hoveredNavButton
                  ]}
                  onPress={() => handleYearChange('prev')}
                  {...(Platform.OS === 'web' ? {
                    onMouseEnter: () => setHoveredNav('year-prev'),
                    onMouseLeave: () => setHoveredNav(null)
                  } : {})}
                >
                  <Ionicons name="chevron-back" size={20} color={colors.text.primary} />
                </TouchableOpacity>
                
                <Text style={styles.yearText}>{currentYear}</Text>
                
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    hoveredNav === 'year-next' && styles.hoveredNavButton
                  ]}
                  onPress={() => handleYearChange('next')}
                  {...(Platform.OS === 'web' ? {
                    onMouseEnter: () => setHoveredNav('year-next'),
                    onMouseLeave: () => setHoveredNav(null)
                  } : {})}
                >
                  <Ionicons name="chevron-forward" size={20} color={colors.text.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.monthHeader}>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    hoveredNav === 'month-prev' && styles.hoveredNavButton
                  ]}
                  onPress={() => handleMonthChange('prev')}
                  {...(Platform.OS === 'web' ? {
                    onMouseEnter: () => setHoveredNav('month-prev'),
                    onMouseLeave: () => setHoveredNav(null)
                  } : {})}
                >
                  <Ionicons name="chevron-back" size={16} color={colors.text.primary} />
                </TouchableOpacity>
                
                <Text style={styles.monthText}>{getMonthName(currentMonth)}</Text>
                
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    hoveredNav === 'month-next' && styles.hoveredNavButton
                  ]}
                  onPress={() => handleMonthChange('next')}
                  {...(Platform.OS === 'web' ? {
                    onMouseEnter: () => setHoveredNav('month-next'),
                    onMouseLeave: () => setHoveredNav(null)
                  } : {})}
                >
                  <Ionicons name="chevron-forward" size={16} color={colors.text.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.calendarGrid}>
                <View style={styles.dayHeader}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <Text key={day} style={styles.dayHeaderText}>{day}</Text>
                  ))}
                </View>
                <View style={styles.daysGrid}>
                  {renderCalendar()}
                </View>
              </View>
            </View>
        </DropdownContainer>
      </ModalOverlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },  
  disabledInput: {
    backgroundColor: colors.neutral[100],
    opacity: 0.6,
  },
  inputText: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
  placeholderText: {
    color: colors.text.tertiary,
    fontSize: 14,
  },
  disabledText: {
    color: colors.neutral[500],
    fontSize: 14,
  },
  calendarContainer: {
    padding: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.gray[50],
  },
  hoveredNavButton: {
    backgroundColor: colors.primary[100],
  },
  yearText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
  calendarGrid: {
    marginTop: 8,
  },
  dayHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    paddingVertical: 8,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedDay: {
    backgroundColor: colors.primary[500],
    borderRadius: '100%',
  },
  todayDay: {
    backgroundColor: colors.primary[100],
    borderRadius: '100%',
  },
  dayText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  selectedDayText: {
    color: colors.text.inverse,
    fontWeight: '600',
  },
  todayDayText: {
    color: colors.primary[700],
    fontWeight: '600',
  },
  hoveredDay: {
    backgroundColor: colors.primary[100],
    borderRadius: '100%',
  },
  hoveredDayText: {
    color: colors.primary[700],
    fontWeight: '500',
  },
});

export default DateInputAdapter;
