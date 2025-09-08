import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';

interface DateInputAdapterProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
}

const DateInputAdapter: React.FC<DateInputAdapterProps> = ({
  value = '',
  onChange,
  placeholder = 'Select date',
  disabled = false,
  style,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [displayDate, setDisplayDate] = useState<string>(value);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  
  const inputRef = useRef<TextInput>(null);

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
    }
  }, [value]);

  // Update display when selectedDate changes
  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    setDisplayDate(formattedDate);
  }, [selectedDate]);

  const handleInputPress = () => {
    if (!disabled) {
      setIsCalendarOpen(true);
    }
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    setIsCalendarOpen(false);
    
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(newDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}/${month}/${dayStr}`;
    
    onChange?.(formattedDate);
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
      const isSelected = selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentMonth && 
                        selectedDate.getFullYear() === currentYear;
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentMonth && 
                     new Date().getFullYear() === currentYear;

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            isSelected && styles.selectedDay,
            isToday && !isSelected && styles.todayDay,
          ]}
          onPress={() => handleDateSelect(day)}
        >
          <Text
            style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isToday && !isSelected && styles.todayDayText,
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
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.inputContainer, disabled && styles.disabledInput]}
        onPress={handleInputPress}
        disabled={disabled}
      >
        <Ionicons name="calendar-outline" size={16} color={colors.text.secondary} style={styles.icon} />
        <Text style={[styles.inputText, !displayDate && styles.placeholderText]}>
          {displayDate || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.text.secondary} />
      </TouchableOpacity>

      <Modal
        visible={isCalendarOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCalendarOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsCalendarOpen(false)}
        >
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handleYearChange('prev')}
              >
                <Ionicons name="chevron-back" size={20} color={colors.text.primary} />
              </TouchableOpacity>
              
              <Text style={styles.yearText}>{currentYear}</Text>
              
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handleYearChange('next')}
              >
                <Ionicons name="chevron-forward" size={20} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.monthHeader}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handleMonthChange('prev')}
              >
                <Ionicons name="chevron-back" size={16} color={colors.text.primary} />
              </TouchableOpacity>
              
              <Text style={styles.monthText}>{getMonthName(currentMonth)}</Text>
              
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handleMonthChange('next')}
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
        </TouchableOpacity>
      </Modal>
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
  },
  disabledInput: {
    opacity: 0.6,
  },
  icon: {
    marginRight: 8,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: typography.body.fontFamily,
  },
  placeholderText: {
    color: colors.text.tertiary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  calendarContainer: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 320,
    shadowColor: colors.shadow.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
    borderRadius: 20,
  },
  todayDay: {
    backgroundColor: colors.primary[100],
    borderRadius: 20,
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
});

export default DateInputAdapter;
