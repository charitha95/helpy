import React from 'react';
import Guide from '../../pages/guide';
import Welcome from '../../pages/welcome';
import Signin from '../../pages/sign-in';
import Signup from '../../pages/signup';
import Home from '../../pages/home';
import Call from '../../pages/call';
import { Switch, Route } from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AuthRouter = () => {
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
                <PublicRoute exact path='/' component={Guide} authenticated={false} />
                <PublicRoute exact path='/guide' component={Guide} authenticated={false} />
                <PublicRoute exact path='/welcome' component={Welcome} authenticated={false} />
                <PublicRoute exact path='/signin' component={Signin} authenticated={false} />
                <PublicRoute exact path='/signup' component={Signup} authenticated={false} />
                <PrivateRoute exact path='/home' component={Home} authenticated={false} />
                <PrivateRoute exact path='/call' component={Call} authenticated={false} />
            </AnimatedSwitch>
        </Switch>
    )
}
export default AuthRouter;