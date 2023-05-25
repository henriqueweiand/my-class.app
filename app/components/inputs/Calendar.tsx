'use client';

import {
  Calendar,
} from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
  value: Date,
  onChange: (value: any) => void;
  disabledDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates
}) => {
  return (
    <Calendar
      date={value}
      onChange={onChange}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
}

export default DatePicker;
