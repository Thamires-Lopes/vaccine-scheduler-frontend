/* eslint-disable no-underscore-dangle */

import React, { useContext } from 'react';
import {
  Dropdown, ButtonGroup, Button, DropdownButton, Row,
} from 'react-bootstrap';
import { AppointmentContext } from '../../AppointmentContext';
import { formatDate, formatTime } from '../../utils/date.utils';

const DropdownFilter = ({ history }) => {
  const { appointments, showAppointments, setShowAppointments } = useContext(AppointmentContext);

  // function to sort string dates
  const sort = (array) => {
    array.sort((a, b) => {
      const newA = a.split('/').reverse().join('');
      const newB = b.split('/').reverse().join('');
      return newA.localeCompare(newB);
    });
  };

  // function to sorting appointments by vaccine time
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

  // function to get unique dates in appointments list
  const getUniqueDates = () => {
    const uniqueArr = [...new Set(appointments.map((data) => data.vaccineDay))];
    sort(uniqueArr);
    return uniqueArr;
  };

  // function to filter appointment list by date and set a new list in showAppointments
  const filter = (appointment) => {
    const compare = formatDate(appointment);
    const newArray = appointments.filter((vac) => (
      new Date(vac.vaccineDay).toLocaleDateString() === compare));
    setShowAppointments(newArray);
  };

  return (
    <>
      <Row className="justify-content-md-center">
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
          <Button onClick={() => history.push('/')} variant="danger">Voltar</Button>
        </ButtonGroup>
      </Row>

    </>
  );
};

export default DropdownFilter;
