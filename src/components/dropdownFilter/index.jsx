/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
  Dropdown, ButtonGroup, Button, DropdownButton,
} from 'react-bootstrap';
import { VaccineContext } from '../../VaccineContext';

const DropdownFilter = () => {
  const [vaccines, setVaccines, showAppointments, setShowAppointments] = useContext(VaccineContext);

  const getUniqueDates = () => {
    const uniqueArr = [...new Set(vaccines.map((data) => data.vaccineDay))];
    uniqueArr.sort((a, b) => {
      const newA = a.split('/').reverse().join('');
      const newB = b.split('/').reverse().join('');
      return newA.localeCompare(newB);
    });
    return uniqueArr;
  };

  const filter = (appointment) => {
    const compare = new Date(appointment).toLocaleDateString();
    const newArray = vaccines.filter((vac) => (
      new Date(vac.vaccineDay).toLocaleDateString() === compare));
    setShowAppointments(newArray);
  };

  return (
    <>
      <ButtonGroup className="m-2">
        <DropdownButton as={ButtonGroup} title="Agrupe por data" id="bg-nested-dropdown">
          {vaccines.length ? getUniqueDates().map((appointment) => (
            <Dropdown.Item
              key={appointment._id}
              onClick={() => filter(appointment)}
            >
              {new Date(appointment).toLocaleDateString()}
            </Dropdown.Item>
          )) : (
            <Dropdown.Item>Sem datas</Dropdown.Item>
          )}
        </DropdownButton>
        <Button variant="secondary">Crescente</Button>
        <Button variant="secondary">Decrescente</Button>
      </ButtonGroup>

    </>
  );
};

export default DropdownFilter;
