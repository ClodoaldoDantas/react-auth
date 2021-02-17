import React, { useEffect, useState } from 'react';
import Center from '../components/Center';
import { Card, Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

export default function Home() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useState(null);

  function handleLogout() {
    dispatch.auth.logout();
    history.replace('/');
  }

  useEffect(() => {
    api.get('/welcome').then(response => {
      setData(response.data);
    });
  }, []);

  return (
    <Center>
      <Card style={{ width: 400 }}>
        <Card.Body>
          <Card.Title className="mb-3">Bem-vindo 🥰</Card.Title>

          <div className="mb-3">
            <div>
              <strong>email: </strong>
              {user?.email}
            </div>
            <div>
              <strong>ID do usuário: </strong>
              {data?.userId}
            </div>
          </div>

          {data && <Alert variant="info">{data.message}</Alert>}

          <Button onClick={handleLogout} variant="primary" block>
            Sair da conta
          </Button>
        </Card.Body>
      </Card>
    </Center>
  );
}
