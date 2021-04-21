/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import {
  Modal, Button, Form, Badge,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { VaccineContext } from '../../VaccineContext';
import axios from '../../utils/api';

const UpdateModal = ({ show, setModalShow, vaccineToEdit }) => {
  const [vaccines, setVaccines, showAppointments, setShowAppointments] = useContext(VaccineContext);

  const onHide = () => {
    setModalShow(false);
  };

  const onSubmit = async (values) => {
    try {
      await axios.put(`/appointment/${vaccineToEdit._id}`, values);
      const updatedList = showAppointments.map((vac) => {
        if (vac._id === vaccineToEdit._id) {
          const data = {
            ...vac,
            ...values,
          };
          return data;
        }
        return vac;
      });
      setShowAppointments(updatedList);
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
          {`${vaccineToEdit.firstName} ${vaccineToEdit.lastName}`}
        </Modal.Title>
      </Modal.Header>
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          observation: vaccineToEdit.observation,
          appointmentDone: vaccineToEdit.appointmentDone,
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
