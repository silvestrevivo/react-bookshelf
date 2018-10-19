import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './hoc/Layout'
import BookView from './containers/BookView'
import Login from './containers/Admin/Login'
import Auth from './hoc/Auth'
import Admin from './components/Admin/Admin'
import Add from './containers/Admin/Add'
import UserPosts from './components/Admin/UserPosts'
import Edit from './containers/Admin/Edit'
import Register from './containers/Admin/Register'

const RoutesApp = () => (
  <Layout>
    <Switch>
      <Route path="/" component={Auth(Home, null)} exact />
      <Route path="/login" component={Auth(Login, false)} exact />
      <Route path="/user" component={Auth(Admin, true)} exact />
      <Route path="/user/add" component={Auth(Add, true)} exact />
      <Route path="/user/register" component={Auth(Register, true)} exact />
      <Route path="/user/edit-post/:id" component={Auth(Edit, true)} exact />
      <Route path="/books/:id" component={Auth(BookView)} exact />
      <Route path="/user/user-reviews" component={Auth(UserPosts, true)} exact />
    </Switch>
  </Layout>
)

export default RoutesApp
