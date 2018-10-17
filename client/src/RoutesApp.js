import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './hoc/Layout'
import BookView from './containers/BookView'
import Login from './containers/Admin/Login'
import Auth from './hoc/Auth'
import Admin from './components/Admin/Admin'

const RoutesApp = () => (
  <Layout>
    <Switch>
      <Route path="/" component={Auth(Home, null)} exact />
      <Route path="/login" component={Auth(Login, false)} exact />
      <Route path="/user" component={Auth(Admin, true)} exact />
      <Route path="/books/:id" component={Auth(BookView)} exact />
    </Switch>
  </Layout>
)

export default RoutesApp
