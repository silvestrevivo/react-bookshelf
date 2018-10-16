import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './hoc/Layout';
import BookView from './containers/BookView';
import Login from './containers/Admin/Login';

const RoutesApp = () => (
  <Layout>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/books/:id" component={BookView} exact />
    </Switch>
  </Layout>
);

export default RoutesApp;
