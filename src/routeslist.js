import Home from './pages/home';
import AppointmentList from './pages/appointmentList';
import AppointmentRegister from './pages/appointmentRegister';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/register',
    component: AppointmentRegister,
  },
  {
    path: '/list',
    component: AppointmentList,
  },
];

export default routes;
