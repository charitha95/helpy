import React from 'react';
import signin from '../../assets/imgs/taxi-sign-up.png'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Signin() {
  return (
    <div className='page-padding-x page-padding-y page-wrapper primary-background'>
      <div className='signin-page'>
        <figure>
          <img src={signin} alt='signin' />
        </figure>
        <section className='signin-container'>
          <h3>Sign in</h3>
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>User name</Form.Label>
              <Form.Control type="text" placeholder="dinu perera" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="o o o o o" />
            </Form.Group>
          </Form>
          <Link to='/signup'>
            <Button variant="secondary">Sign in</Button>
          </Link>
          <p>Don't have an account?</p>
          <p><span>signup</span></p>
        </section>
      </div>
    </div>
  )
}

export default Signin;