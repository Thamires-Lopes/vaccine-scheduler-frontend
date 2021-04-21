import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { parseISO } from 'date-fns';
import axios from '../../utils/api';
import FormDatePicker from './formDatePicker';
import FormTimePicker from './formTimePicker';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthday: yup.date()
    .required('Required')
    .nullable(),
  vaccineDay: yup.date()
    .required('Required')
    .nullable(),
  vaccineTime: yup.date('Required')
    .required()
    .nullable(),
});

const onSubmit = async (values) => {
  try {
    await axios.post('/appointment', values);
    toast.info('Successful appointment registration');
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({});

  const checkDateFields = (form) => {
    let birthday = null;
    let vaccineDay = null;
    let vaccineTime = null;
    if (form.birthday != null) {
      birthday = parseISO(form.birthday);
    }
    if (form.vaccineDay != null) {
      vaccineDay = parseISO(form.vaccineDay);
    }

    if (form.vaccineTime != null) {
      vaccineTime = parseISO(form.vaccineTime);
    }

    const newDateFields = {
      birthday,
      vaccineDay,
      vaccineTime,
    };

    return newDateFields;
  };

  const setInitialValues = () => {
    const initialValues = sessionStorage.getItem('values');
    if (initialValues) {
      let form = JSON.parse(initialValues);
      const dateFields = checkDateFields(form);
      form = {
        ...form,
        ...dateFields,
      };

      setFormValues(form);
    } else {
      setFormValues({
        firstName: '',
        lastName: '',
        birthday: null,
        vaccineDay: null,
        vaccineTime: null,
      });
    }
  };

  useEffect(() => {
    setInitialValues();
  }, []);

  return (
    <Formik
      enableReinitialize
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={formValues}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        isValid,
        errors,
        setFieldValue,
      }) => {
        const saveFormValues = () => {
          if (!(Object.keys(values).length === 0 && values.constructor === Object)) {
            sessionStorage.setItem('values', JSON.stringify(values));
          }
        };

        useEffect(() => {
          saveFormValues();
        }, [values]);

        return (
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
                  name="birthday"
                  value={values.birthday}
                  isValid={!errors.birthday}
                  isInvalid={touched.birthday && !!errors.birthday}
                  onChange={setFieldValue}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Dia da vacina</Form.Label>
                <FormDatePicker
                  name="vaccineDay"
                  value={values.vaccineDay}
                  isValid={!errors.vaccineDay}
                  isInvalid={touched.vaccineDay && !!errors.vaccineDay}
                  onChange={setFieldValue}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Hora da vacina</Form.Label>
                <FormTimePicker
                  name="vaccineTime"
                  value={values.vaccineTime}
                  isValid={!errors.vaccineTime}
                  isInvalid={touched.vaccineTime && !!errors.vaccineTime}
                  onChange={setFieldValue}
                />
              </Form.Group>
              <Button disabled={!isValid} onClick={handleSubmit}>
                Enviar
              </Button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
