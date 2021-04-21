/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { VaccineContext } from '../../VaccineContext';

const DropdownFilter = () => {
  const [vaccines, setVaccines, showAppointments, setShowAppointments] = useContext(VaccineContext);

  const getUniqueDates = () => {
    const uniqueArr = [...new Set(vaccines.map((data) => data.vaccineDay))];
    return uniqueArr;
  };

  const filter = (appointment) => {
    const compare = new Date(appointment).toLocaleDateString();
    const newArray = vaccines.filter((vac) => (
      new Date(vac.vaccineDay).toLocaleDateString() === compare));
    setShowAppointments(newArray);
  };

  return (
    <Dropdown className="m-2">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Agrupe por data
      </Dropdown.Toggle>

      <Dropdown.Menu>
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
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownFilter;
