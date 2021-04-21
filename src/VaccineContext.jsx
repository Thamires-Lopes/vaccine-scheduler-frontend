import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import myAxios from './utils/api';

const VaccineContext = createContext();

const VaccineContextProvider = ({ children }) => {
  const [vaccines, setVaccines] = useState([]);
  const [showAppointments, setShowAppointments] = useState([]);

  const fetchVaccines = async () => {
    try {
      const response = await myAxios.get('/appointment');
      setVaccines(response.data.appointments);
      setShowAppointments(response.data.appointments);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  return (
    <VaccineContext.Provider value={[vaccines, setVaccines, showAppointments, setShowAppointments]}>
      {children}
    </VaccineContext.Provider>
  );
};

export { VaccineContext, VaccineContextProvider };
