/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import {
  Card, Button, Alert, Badge,
} from 'react-bootstrap';
import { VaccineContext } from '../../VaccineContext';
import DropdownFilter from '../dropdownFilter';
import { formatDate, formatTime, calculateAge } from '../../utils/date.utils';

const Appointment = () => {
  const [vaccines] = useContext(VaccineContext);
  return (
    <div>
      <DropdownFilter />
      {
        vaccines.length ? vaccines.map((vaccine, index) => (
          <Card key={vaccine._id}>
            <Card.Header as="h5">
              {`Vacina: ${index}`}
              {vaccine.appointmentDone ? (
                <Badge className="ml-4" variant="success">Aplicada</Badge>
              ) : (
                <Badge className="ml-4" variant="warning">Não aplicada</Badge>
              )}
            </Card.Header>
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
