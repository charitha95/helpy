import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, authenticated, redirectTo='home'}) => {
  console.log(redirectTo)
  return (
    <Route
      render={() => authenticated === false
        ? <Component />
        : <Redirect to={redirectTo} />}
    />
  )
}

export default PublicRoute;

