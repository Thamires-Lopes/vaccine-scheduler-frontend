import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormDatePicker = ({ name, value, onChange }) => (
  <DatePicker
    selected={value}
    onChange={(val) => {
      onChange(name, val);
    }}
    peekNextMonth
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
  />
);

export default FormDatePicker;
