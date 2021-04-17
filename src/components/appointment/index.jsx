/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
  Card, Button, Alert,
} from 'react-bootstrap';
import { VaccineContext } from '../../VaccineContext';
import DropdownFilter from '../dropdownFilter';

const formatDate = (date) => new Date(date).toLocaleDateString();

const formatTime = (date) => `${new Date(date).getHours()}:00`;

const calculateAge = (date) => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  const birthdate = new Date(date);
  const birthdateYear = birthdate.getFullYear();
  const birthdateMonth = birthdate.getMonth() + 1;
  const birthdateDay = birthdate.getDate();

  let result = todayYear - birthdateYear;
  if (todayMonth === birthdateMonth) {
    if (todayDay < birthdateDay) {
      result -= 1;
    }
  } else if (todayMonth < birthdateMonth) {
    result -= 1;
  }

  return result;
};

const Appointment = () => {
  const [vaccines, setVaccines] = useContext(VaccineContext);
  return (
    <div>
      <DropdownFilter />
      {
        vaccines.length ? vaccines.map((vaccine, index) => (
          <Card key={vaccine._id}>
            <Card.Header as="h5">{`Vacina: ${index}`}</Card.Header>
            <Card.Body>
              <Card.Title>{`${vaccine.firstName} ${vaccine.lastName}`}</Card.Title>
              <Card.Text>
                {`Aniversário: ${formatDate(vaccine.birthday)}`}
              </Card.Text>
              <Card.Text>
                {`Idade: ${calculateAge(vaccine.birthday)}`}
              </Card.Text>
              <Card.Text>
                {`Data da vacina: ${formatDate(vaccine.vaccineDay)}`}
              </Card.Text>
              <Card.Text>
                {`Horário da vacina: ${formatTime(vaccine.vaccineTime)}`}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        )) : (
          <Alert className="m-2" variant="dark">
            Sem vacinas agendadas!
          </Alert>
        )
      }
    </div>
  );
};

export default Appointment;
