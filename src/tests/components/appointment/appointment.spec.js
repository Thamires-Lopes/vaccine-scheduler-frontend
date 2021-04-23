/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import { render } from '@testing-library/react';
import Appointment from '../../../components/appointment/index';
import { AppointmentContext } from '../../../AppointmentContext';

const AppointmentsWrapper = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState([]);
  return (
    <AppointmentContext.Provider value={{
      appointments,
      setAppointments,
      showAppointments,
      setShowAppointments,
    }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

describe('Renders', () => {
  it('renders appointments empty list', () => {
    const { queryByText } = render(
      <AppointmentsWrapper>
        <Appointment />
      </AppointmentsWrapper>,
    );

    expect(queryByText('Sem vacinas agendadas!')).toBeTruthy();
  });
});
