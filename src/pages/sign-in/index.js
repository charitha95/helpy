import React from 'react';
import sigin from '../../assets/imgs/taxi-sign-up.png'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Signin() {
  return (
    <div className='page-padding-x page-padding-y page-wrapper primary-background'>
      <div className='signin-page'>
        <figure>
          <img src={sigin} alt='sigin' />
        </figure>
        <section className='signin-container'>
          <h3>Sign in</h3>
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
          <Link to='/signup'>
            <Button variant="secondary">Sign in</Button>
          </Link>
          <p>Don't have an account?</p>
          <span>signup</span>
        </section>
      </div>
    </div>
  )
}

export default Signin;