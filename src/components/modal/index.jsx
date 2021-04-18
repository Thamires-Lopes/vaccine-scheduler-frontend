/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { VaccineContext } from '../../VaccineContext';
import axios from '../../utils/api';

const UpdateModal = ({ show, setModalShow, vaccineToEdit }) => {
  const [vaccines, setVaccines] = useContext(VaccineContext);

  const onHide = () => {
    setModalShow(false);
  };

  const onSubmit = async (values) => {
    try {
      await axios.put(`/appointment/${vaccineToEdit._id}`, values);
      const updatedList = vaccines.map((vac) => {
        if (vac._id === vaccineToEdit._id) {
          const data = {
            ...vac,
            ...values,
          };
          return data;
        }
        return vac;
      });
      setVaccines(updatedList);
      toast.info('Successful appointment update!');
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
          observation: '',
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
                  <Form.Label>Observation</Form.Label>
                  <Form.Control
                    type="text"
                    name="observation"
                    value={values.observation}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleSubmit}>
                Enviar
              </Button>
              <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
          </div>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateModal;
