import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';
import FormDatePicker from './formDatePicker';
import FormTimePicker from './formTimePicker';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup.date()
    .required('Required')
    .nullable(),
  vacineDay: yup.date()
    .required('Required')
    .nullable(),
  vacineTime: yup.string().required(),
});

const onSubmit = (values) => {
  console.log('SUBMIT', values);
};

const RegisterForm = () => (
  <Formik
    validationSchema={schema}
    onSubmit={onSubmit}
    initialValues={{
      firstName: '',
      lastName: '',
      birthDate: null,
      vacineDay: null,
      vacineTime: '',
    }}
  >
    {({
      handleSubmit,
      handleChange,
      values,
      touched,
      isValid,
      errors,
      setFieldValue,
    }) => (
      <div>
        <Form className="m-4" noValidate>
          <Form.Group>
            <Form.Label>Primeiro nome</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              isValid={touched.firstName && !errors.firstName}
              isInvalid={touched.firstName && !!errors.firstName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              isValid={touched.lastName && !errors.lastName}
              isInvalid={touched.lastName && !!errors.lastName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Data de nascimento</Form.Label>
            <FormDatePicker
              name="birthDate"
              value={values.birthDate}
              isValid={!errors.birthDate}
              isInvalid={touched.birthDate && !!errors.birthDate}
              onChange={setFieldValue}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dia da vacina</Form.Label>
            <FormDatePicker
              name="vacineDay"
              value={values.vacineDay}
              isValid={!errors.vacineDay}
              isInvalid={touched.vacineDay && !!errors.vacineDay}
              onChange={setFieldValue}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Hora da vacina</Form.Label>
            <FormTimePicker
              name="vacineTime"
              value={values.vacineTime}
              isValid={!errors.vacineTime}
              isInvalid={touched.vacineTime && !!errors.vacineTime}
              onChange={setFieldValue}
            />
          </Form.Group>
          <Button disabled={!isValid} onClick={handleSubmit}>
            Enviar
          </Button>
        </Form>
      </div>
    )}
  </Formik>
);

export default RegisterForm;
