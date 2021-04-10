import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  // birthday: yup.date().required(),
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
      birthday: '',
    }}
  >
    {({
      handleSubmit,
      handleChange,
      values,
      touched,
      isValid,
      errors,
    }) => (
      <Form className="m-4" noValidate onSubmit={handleSubmit}>
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
        <Button type="submit" disabled={!isValid}>
          Enviar
        </Button>
      </Form>
    )}
  </Formik>
);

export default RegisterForm;
