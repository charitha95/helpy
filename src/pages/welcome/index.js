import React from 'react';
import welcome from '../../assets/imgs/taxi-delivery-1.png';
import queryString from 'query-string';

import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Welcome({ location }) {
  const qString = queryString.parse(location.search);
  return (
    <div className='page-padding-x page-padding-y page-wrapper'>
      <div className='welcome-page'>
        <section className='title'>
          <h3>Welcome to Helpy</h3>
        </section>

        <section className='illustration'>
          <figure>
            <img src={welcome} alt='welcome'></img>
          </figure>
        </section>

        <section className='actions'>
          <Link to={`${qString.type === 'give' ? '/signin-provider' : '/signin'}`}>
            <Button variant="secondary">Sign in</Button>
          </Link>
          <Link to={`${qString.type === 'give' ? '/signup-provider' : '/signup'}`}>
            <Button variant="secondary">Sign up</Button>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default withRouter(Welcome);