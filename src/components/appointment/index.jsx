/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import {
  Card, Button, Alert, Badge,
} from 'react-bootstrap';
import { VaccineContext } from '../../VaccineContext';
import DropdownFilter from '../dropdownFilter';
import { formatDate, formatTime, calculateAge } from '../../utils/date.utils';
import UpdateModal from '../modal';

const Appointment = () => {
  const [vaccines, setVaccines, showAppointments, setShowAppointments] = useContext(VaccineContext);
  const [modalShow, setModalShow] = useState(false);
  const [vaccineToEdit, setVaccineToEdit] = useState({});

  const callModal = (vaccine) => {
    setVaccineToEdit(vaccine);
    setModalShow(true);
  };
  return (
    <>
      <DropdownFilter />
      <UpdateModal
        show={modalShow}
        setModalShow={setModalShow}
        vaccineToEdit={vaccineToEdit}
      />
      {
        showAppointments.length ? showAppointments.map((vaccine, index) => (
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
              {vaccine.observation ? (
                <Card.Text>
                  {`Observação: ${vaccine.observation}`}
                </Card.Text>
              ) : (
                <Card.Text>
                  Observação: Sem observação
                </Card.Text>
              )}

              <Button variant="primary" onClick={() => callModal(vaccine)}>Editar agendamento</Button>
            </Card.Body>
          </Card>
        )) : (
          <Alert className="m-2" variant="dark">
            Sem vacinas agendadas!
          </Alert>
        )
      }
    </>
  );
};

export default Appointment;
