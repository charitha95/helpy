import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component }) => {
  return (
    <Route component={Component} />
  )
}

export default PublicRoute;

