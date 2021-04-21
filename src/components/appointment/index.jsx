/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import {
  Card, Button, Alert, Badge,
} from 'react-bootstrap';
import { AppointmentContext } from '../../AppointmentContext';
import DropdownFilter from '../dropdownFilter';
import { formatDate, formatTime, calculateAge } from '../../utils/date.utils';
import UpdateModal from '../modal';

const Appointment = () => {
  const [appointments, setAppointments,
    showAppointments, setShowAppointments] = useContext(AppointmentContext);
  const [modalShow, setModalShow] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState({});

  const callModal = (vaccine) => {
    setAppointmentToEdit(vaccine);
    setModalShow(true);
  };
  return (
    <>
      <DropdownFilter />
      <UpdateModal
        show={modalShow}
        setModalShow={setModalShow}
        appointmentToEdit={appointmentToEdit}
      />
      {
        showAppointments.length ? showAppointments.map((appointment, index) => (
          <Card key={appointment._id}>
            <Card.Header as="h5">
              {`Vacina: ${index + 1}`}
              {appointment.appointmentDone ? (
                <Badge className="ml-4" variant="success">Aplicada</Badge>
              ) : (
                <Badge className="ml-4" variant="warning">Não aplicada</Badge>
              )}
            </Card.Header>
            <Card.Body>
              <Card.Title>{`${appointment.firstName} ${appointment.lastName}`}</Card.Title>
              <Card.Text>
                {`Aniversário: ${formatDate(appointment.birthday)}`}
              </Card.Text>
              <Card.Text>
                {`Idade: ${calculateAge(appointment.birthday)}`}
              </Card.Text>
              <Card.Text>
                {`Data da vacina: ${formatDate(appointment.vaccineDay)}`}
              </Card.Text>
              <Card.Text>
                {`Horário da vacina: ${formatTime(appointment.vaccineTime)}:00`}
              </Card.Text>
              {appointment.observation ? (
                <Card.Text>
                  {`Observação: ${appointment.observation}`}
                </Card.Text>
              ) : (
                <Card.Text>
                  Observação: Sem observação
                </Card.Text>
              )}

              <Button variant="primary" onClick={() => callModal(appointment)}>Editar agendamento</Button>
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
