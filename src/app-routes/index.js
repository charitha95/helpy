import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Guide from '../pages/guide';
import Welcome from '../pages/welcome';
import Signin from '../pages/sign-in';
import Signup from '../pages/signup';
import { spring, AnimatedSwitch } from 'react-router-transition';
import Home from '../pages/home';
import Call from '../pages/call';
// import NotFound from '../pages/404';


function AppRoutes() {
  function mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale})`,
    };
  }

  function bounce(val) {
    return spring(val, {
      stiffness: 330,
      damping: 22,
    });
  }

  const bounceTransition = {
    atEnter: {
      opacity: 0,
      scale: 1.2,
    },
    atLeave: {
      opacity: bounce(0),
      scale: bounce(0.8),
    },
    atActive: {
      opacity: bounce(1),
      scale: bounce(1),
    },
  };

  return (
    <Switch>
      <AnimatedSwitch
         atEnter={bounceTransition.atEnter}
         atLeave={bounceTransition.atLeave}
         atActive={bounceTransition.atActive}
         mapStyles={mapStyles}
        className="switch-wrapper"
      >
        <Route exact path='/' component={Guide} />
        <Route exact path='/guide' component={Guide} />
        <Route exact path='/welcome' component={Welcome} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/call' component={Call} />
      </AnimatedSwitch>


    </Switch>
  )
}

export default AppRoutes;