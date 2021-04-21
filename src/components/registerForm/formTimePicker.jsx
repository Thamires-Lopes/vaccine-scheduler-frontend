import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours } from 'date-fns';

const FormTimePicker = ({ name, value, onChange }) => (
  <DatePicker
    selected={value}
    onChange={(val) => {
      onChange(name, val);
    }}
    showTimeSelect
    showTimeSelectOnly
    minTime={setHours(new Date(), 7)}
    maxTime={setHours(new Date(), 17)}
    timeIntervals={60}
    timeCaption="Time"
    dateFormat="h:mm aa"
  />
);

export default FormTimePicker;
