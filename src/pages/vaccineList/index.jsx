import React from 'react';
import Appointment from '../../components/appointment';
import { VaccineContextProvider } from '../../VaccineContext';

const VaccineList = () => (
  <VaccineContextProvider>
    <Appointment />
  </VaccineContextProvider>
);

export default VaccineList;
