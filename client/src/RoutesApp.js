import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './hoc/Layout';

const RoutesApp = () => (
  <Layout>
    <Switch>
      <Route path="/" component={Home} exact />
    </Switch>
  </Layout>
);

export default RoutesApp;
