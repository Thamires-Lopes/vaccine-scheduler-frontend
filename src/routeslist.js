import Home from './pages/home';
import VaccineRegister from './pages/vaccineRegister';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/register',
    component: VaccineRegister,
  },
  {
    path: '/list',
  },
];

export default routes;
