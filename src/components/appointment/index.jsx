/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { VaccineContext } from '../../VaccineContext';

const formatDate = (date) => new Date(date).toLocaleDateString();
const formatTime = (date) => `${new Date(date).getHours()}:00`;

const Appointment = () => {
  const [vaccines, setVaccines] = useContext(VaccineContext);
  return (
    <div>
      {
        vaccines.length ? vaccines.map((vaccine, index) => (
          <Card>
            <Card.Header as="h5">{`Vacina: ${index}`}</Card.Header>
            <Card.Body>
              <Card.Title>{`${vaccine.firstName} ${vaccine.lastName}`}</Card.Title>
              <Card.Text>
                {`Aniversário: ${formatDate(vaccine.birthday)}`}
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
          <div>Sem dados</div>
        )
      }
    </div>
  );
};

export default Appointment;
