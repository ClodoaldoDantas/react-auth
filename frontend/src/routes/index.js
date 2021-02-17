import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import ContentRoute from './ContentRoute';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <ContentRoute exact path="/" component={Login} />
        <ContentRoute path="/register" component={Register} />
        <ContentRoute isPrivate path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
