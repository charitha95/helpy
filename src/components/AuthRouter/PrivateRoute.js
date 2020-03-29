import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated }) => {
  const isProvider = localStorage.getItem('isProvider') === 'true';
  return (
    <Route
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={`${isProvider ? '/signin-provider' : '/signin'}`} />}
    />
  )
}

export default PrivateRoute;

