import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Guide from '../pages/guide';
import Welcome from '../pages/welcome';
import Signin from '../pages/sign-in';
import Signup from '../pages/signup';
import { AnimatedSwitch } from 'react-router-transition';
// import NotFound from '../pages/404';


function AppRoutes() {
  return (
    <Switch>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route exact path='/' component={Guide} />
        <Route exact path='/guide' component={Guide} />
        <Route exact path='/welcome' component={Welcome} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
      </AnimatedSwitch>


    </Switch>
  )
}

export default AppRoutes;