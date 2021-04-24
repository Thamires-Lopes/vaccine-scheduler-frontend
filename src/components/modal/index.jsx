/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import {
  Modal, Button, Form, Badge,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { AppointmentContext } from '../../AppointmentContext';
import axios from '../../utils/api';

const UpdateModal = ({ show, setModalShow, appointmentToEdit }) => {
  const { setAppointments, showAppointments, setShowAppointments } = useContext(AppointmentContext);

  const onHide = () => {
    setModalShow(false);
  };

  const fetchUpdatedAppointments = async () => {
    try {
      const response = await axios.get('/appointment');
      setAppointments(response.data.appointments);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const onSubmit = async (values) => {
    try {
      await axios.put(`/appointment/${appointmentToEdit._id}`, values);
      const updatedList = showAppointments.map((vac) => {
        if (vac._id === appointmentToEdit._id) {
          const data = {
            ...vac,
            ...values,
          };
          return data;
        }
        return vac;
      });
      setShowAppointments(updatedList);
      fetchUpdatedAppointments();
      toast.info('Agendamento atualizado com sucesso!');
      onHide();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`${appointmentToEdit.firstName} ${appointmentToEdit.lastName}`}
        </Modal.Title>
      </Modal.Header>
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          observation: appointmentToEdit.observation,
          appointmentDone: appointmentToEdit.appointmentDone,
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
        }) => (
          <div>
            <Modal.Body>
              <Form className="m-4" noValidate>
                <Form.Group>
                  <Form.Label>Observação</Form.Label>
                  <Form.Control
                    type="text"
                    name="observation"
                    value={values.observation}
                    onChange={handleChange}
                  />
                </Form.Group>
                {values.appointmentDone ? (
                  <Badge variant="success">Aplicada</Badge>
                ) : (
                  <Form.Check
                    name="appointmentDone"
                    type="checkbox"
                    label="Vacina aplicada"
                    onChange={handleChange}
                  />
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleSubmit}>
                Enviar
              </Button>
              <Button onClick={onHide}>Cancelar</Button>
            </Modal.Footer>
          </div>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateModal;
