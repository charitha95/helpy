
import React from 'react';
import signup from '../../assets/imgs/taxi-2.png'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className='page-padding-x page-padding-y page-wrapper primary-background'>
      <div className='signup-page'>
        <figure>
          <img src={signup} alt='signup' />
        </figure>
        <section className='signup-container'>
          <h3>Sign up</h3>
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="dinu@email.com" />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>User name</Form.Label>
              <Form.Control type="text" placeholder="dinu perera" />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="text" placeholder="1994-02-05" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="o o o o o" />
            </Form.Group>
          </Form>
          <Link to='/signup'>
            <Button variant="secondary">Sign up</Button>
          </Link>
          <p>Already a user?</p>
          <p><span>signin</span></p>
        </section>
      </div>
    </div>
  )
}

export default Signup;