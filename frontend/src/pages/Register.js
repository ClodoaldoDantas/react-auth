import React from 'react';

import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Center from '../components/Center';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(state => state.loading.effects.auth.register);
  const error = useSelector(state => state.error);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('E-mail inválido')
        .required('Campo obrigatório'),
      password: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async values => {
      const status = await dispatch.auth.handleLogin({
        request: 'register',
        body: values,
      });

      if (status === 200) {
        history.push('/home');
      }
    },
  });

  const handleClose = () => {
    dispatch.error.closeError();
  };

  return (
    <Center>
      <Card style={{ width: 400 }}>
        <Card.Body>
          <Card.Title className="mb-3">Crie uma nova conta 🥳</Card.Title>

          <Form noValidate onSubmit={formik.handleSubmit}>
            {error.message && (
              <Alert variant="danger" dismissible onClose={handleClose}>
                {error.message}
              </Alert>
            )}

            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                isInvalid={formik.touched.email && !!formik.errors.email}
                isValid={formik.touched.email && !formik.errors.email}
                {...formik.getFieldProps('email')}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Senha</Form.Label>
              <Form.Control
                isInvalid={formik.touched.password && !!formik.errors.password}
                isValid={formik.touched.password && !formik.errors.password}
                {...formik.getFieldProps('password')}
                type="password"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" block variant="success">
              {loading ? <Spinner animation="border" /> : 'Cadastrar'}
            </Button>
          </Form>

          <Link className="d-block text-center mt-3" to="/">
            Entre na sua conta
          </Link>
        </Card.Body>
      </Card>
    </Center>
  );
}
