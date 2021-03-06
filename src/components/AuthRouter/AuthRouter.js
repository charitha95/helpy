import React, { Component } from 'react';
import Guide from '../../pages/guide';
import Welcome from '../../pages/welcome';
import Signin from '../../pages/sign-in';
import Signup from '../../pages/signup';
import Home from '../../pages/home';
import Call from '../../pages/call';
import UserNote from '../../pages/usernote';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { Switch } from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';

import { auth } from '../../services/firebase'
import EmergencyContacts from '../../pages/emergency-contacts';
import SignupProvider from '../../pages/signup-provider';
import HomeProvider from '../../pages/home-provider';
import SigninProvider from '../../pages/sign-in-provider';

class AuthRouter extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false
    }
  }

  async componentWillMount() {
    await auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true
        })
      } else {
        this.setState({
          authenticated: false
        })
      }
    })
  }

  mapStyles = (styles) => {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale})`,
    };
  }

  bounce = (val) => {
    return spring(val, {
      stiffness: 330,
      damping: 22,
    });
  }

  bounceTransition = {
    atEnter: {
      opacity: 0,
      scale: 1.2,
    },
    atLeave: {
      opacity: this.bounce(0),
      scale: this.bounce(0.8),
    },
    atActive: {
      opacity: this.bounce(1),
      scale: this.bounce(1),
    },
  };

  render() {
    return <Switch>
      <AnimatedSwitch
        atEnter={this.bounceTransition.atEnter}
        atLeave={this.bounceTransition.atLeave}
        atActive={this.bounceTransition.atActive}
        mapStyles={this.mapStyles}
        className="switch-wrapper"
      >
        <PublicRoute exact path='/' component={Guide} authenticated={this.state.authenticated} />
        <PublicRoute exact path='/guide' component={Guide} authenticated={this.state.authenticated} />
        <PublicRoute exact path='/welcome' component={Welcome} authenticated={this.state.authenticated} />
        <PublicRoute exact path='/signin' component={Signin} authenticated={this.state.authenticated} />
        <PublicRoute exact path='/signin-provider' component={SigninProvider} authenticated={this.state.authenticated} redirectTo='/home-provider'/>
        <PublicRoute exact path='/signup' component={Signup} authenticated={this.state.authenticated} redirectTo='/user-note' />
        <PublicRoute exact path='/signup-provider' component={SignupProvider} authenticated={this.state.authenticated} redirectTo='/home-provider'/>
        <PrivateRoute exact path='/home' component={Home} authenticated={this.state.authenticated} />
        <PrivateRoute exact path='/call' component={Call} authenticated={this.state.authenticated} />
        <PrivateRoute exact path='/user-note' component={UserNote} authenticated={this.state.authenticated} />
        <PrivateRoute exact path='/emergency-contact' component={EmergencyContacts} authenticated={this.state.authenticated} />
        <PrivateRoute exact path='/home-provider' component={HomeProvider} authenticated={this.state.authenticated} />

      </AnimatedSwitch>
    </Switch >
  }


}
export default AuthRouter;