import React from 'react';
import Appointment from '../../components/appointment';
import { AppointmentContextProvider } from '../../AppointmentContext';

const VaccineList = () => (
  <AppointmentContextProvider>
    <Appointment />
  </AppointmentContextProvider>
);

export default VaccineList;
