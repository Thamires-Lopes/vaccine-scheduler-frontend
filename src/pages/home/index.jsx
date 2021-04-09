import React from 'react';
import { Button } from 'react-bootstrap';

const Home = ({ history }) => (
  <div className="m-4">
    <Button variant="primary" size="lg" block onClick={() => history.push('/register')}>
      Cadastro
    </Button>
    <Button variant="secondary" size="lg" block onClick={() => history.push('/list')}>
      Listagem
    </Button>
  </div>
);

export default Home;
