import React from 'react';
import Appointment from '../../components/appointment';
import { AppointmentContextProvider } from '../../AppointmentContext';

const AppointmentList = ({ history }) => (
  <AppointmentContextProvider>
    <Appointment history={history} />
  </AppointmentContextProvider>
);

export default AppointmentList;
