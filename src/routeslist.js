import Home from './pages/home';
import VaccineList from './pages/vaccineList';
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
    component: VaccineList,
  },
];

export default routes;
