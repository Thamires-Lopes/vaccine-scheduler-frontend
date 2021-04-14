import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormTimePicker = ({ name, value, onChange }) => (
  <DatePicker
    selected={value}
    onChange={(val) => {
      onChange(name, val);
    }}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={60}
    timeCaption="Time"
    dateFormat="h:mm aa"
  />
);

export default FormTimePicker;
