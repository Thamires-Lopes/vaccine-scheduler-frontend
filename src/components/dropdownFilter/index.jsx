/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
  Dropdown, ButtonGroup, Button, DropdownButton,
} from 'react-bootstrap';
import { AppointmentContext } from '../../VaccineContext';
import { formatDate, formatTime } from '../../utils/date.utils';

const DropdownFilter = () => {
  const [appointments, setAppointments,
    showAppointments, setShowAppointments] = useContext(AppointmentContext);

  const sort = (array) => {
    array.sort((a, b) => {
      const newA = a.split('/').reverse().join('');
      const newB = b.split('/').reverse().join('');
      return newA.localeCompare(newB);
    });
  };

  const sortAppointments = (ascending) => {
    const newArr = showAppointments.slice().sort((a, b) => {
      const hourA = formatTime(a.vaccineTime);
      const hourB = formatTime(b.vaccineTime);
      if (ascending) {
        return hourA - hourB;
      }
      return hourB - hourA;
    });
    setShowAppointments(newArr);
  };

  const getUniqueDates = () => {
    const uniqueArr = [...new Set(appointments.map((data) => data.vaccineDay))];
    sort(uniqueArr);
    return uniqueArr;
  };

  const filter = (appointment) => {
    const compare = formatDate(appointment);
    const newArray = appointments.filter((vac) => (
      new Date(vac.vaccineDay).toLocaleDateString() === compare));
    setShowAppointments(newArray);
  };

  return (
    <>
      <ButtonGroup className="m-2">
        <DropdownButton as={ButtonGroup} title="Agrupe por data" id="bg-nested-dropdown">
          {appointments.length ? getUniqueDates().map((appointment) => (
            <Dropdown.Item
              key={appointment._id}
              onClick={() => filter(appointment)}
            >
              {formatDate(appointment)}
            </Dropdown.Item>
          )) : (
            <Dropdown.Item>Sem datas</Dropdown.Item>
          )}
        </DropdownButton>
        <Button onClick={() => sortAppointments(true)} variant="secondary">Crescente</Button>
        <Button onClick={() => sortAppointments(false)} variant="secondary">Decrescente</Button>
      </ButtonGroup>

    </>
  );
};

export default DropdownFilter;
