import React from 'react';
import Appointment from '../../components/appointment';
import { AppointmentContextProvider } from '../../VaccineContext';

const VaccineList = () => (
  <AppointmentContextProvider>
    <Appointment />
  </AppointmentContextProvider>
);

export default VaccineList;
