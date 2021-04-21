import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import myAxios from './utils/api';

const AppointmentContext = createContext();

const AppointmentContextProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState([]);

  const fetchVaccines = async () => {
    try {
      const response = await myAxios.get('/appointment');
      setAppointments(response.data.appointments);
      setShowAppointments(response.data.appointments);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  return (
    <AppointmentContext.Provider
      value={[appointments, setAppointments, showAppointments, setShowAppointments]}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export { AppointmentContext, AppointmentContextProvider };
