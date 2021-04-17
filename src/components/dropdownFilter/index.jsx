/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { VaccineContext } from '../../VaccineContext';

const DropdownFilter = () => {
  const [vaccines, setVaccines] = useContext(VaccineContext);

  const getUniqueDates = () => {
    const uniqueArr = [...new Set(vaccines.map((data) => data.vaccineDay))];
    return uniqueArr;
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Agrupe por data
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {vaccines.length ? getUniqueDates().map((test) => (
          <Dropdown.Item>{new Date(test).toLocaleDateString()}</Dropdown.Item>
        )) : (
          <Dropdown.Item>Another action</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownFilter;
