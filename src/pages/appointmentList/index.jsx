import React from 'react';
import Appointment from '../../components/appointment';
import { AppointmentContextProvider } from '../../AppointmentContext';

const AppointmentList = () => (
  <AppointmentContextProvider>
    <Appointment />
  </AppointmentContextProvider>
);

export default AppointmentList;
