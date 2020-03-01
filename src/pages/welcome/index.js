import React from 'react';
import welcome from '../../assets/imgs/taxi-delivery-1.png'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Welcome() {
  return (
    <div className='page-padding-x page-padding-y page-wrapper'>
      <div className='welcome-page'>
        <section className='title'>
          <h3>Welcome to Helpy</h3>
        </section>

        <section className='illustration'>
          <div className='backdrop'></div>
          <figure>
            <img src={welcome} alt='welcome'></img>
          </figure>
        </section>

        <section className='actions'>
          <Link to='/signin'>
            <Button variant="secondary">Sign in</Button>
          </Link>
          <Link to='/signup'>
            <Button variant="secondary">Sign up</Button>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Welcome;