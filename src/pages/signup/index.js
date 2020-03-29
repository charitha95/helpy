
import React, { Component } from 'react';
import signup from '../../assets/imgs/taxi-2.png'
import { Form, Button } from 'react-bootstrap';
import { signUp } from '../../helpers/auth';
import { db } from '../../services/firebase';
import { Link } from 'react-router-dom';

class Signup extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      displayName: '',
      phone: '',
      birthDay: '',
    }
  }

  handlechange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    try {
      signUp(this.state.email, this.state.password).then(res => {

        this.saveUserData(res.user.uid);
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  saveUserData(uid) {
    const { firstName, lastName, displayName, phone, birthDay } = this.state;
    db.ref(`users/${uid}`).set({
      first_name: firstName,
      last_name: lastName,
      display_name: displayName,
      phone,
      birth_day: birthDay
    }).then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <div className='page-padding-x page-padding-y page-wrapper primary-background'>
        <div className='signup-page'>
          <figure>
            <img src={signup} alt='signup' />
          </figure>
          <section className='signup-container'>
            <h3>Sign up</h3>
            <Form autoComplete='off' onSubmit={(e) => this.handleSubmit(e)} >
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name='email' type="email" placeholder="dinu@email.com" onChange={(e) => this.handlechange(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="o o o o o" onChange={(e) => this.handlechange(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupFname">
                <Form.Label>First name</Form.Label>
                <Form.Control name='firstName' type="text" placeholder="dinu perera" onChange={(e) => this.handlechange(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupLname">
                <Form.Label>Last name</Form.Label>
                <Form.Control name='lastName' type="text" placeholder="dinu perera" onChange={(e) => this.handlechange(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupDname">
                <Form.Label>Display name</Form.Label>
                <Form.Control name='displayName' type="text" placeholder="dinu perera" onChange={(e) => this.handlechange(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control name='phone' type="number" placeholder="773592055" onChange={(e) => this.handlechange(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupBday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control name='birthDay' type="text" placeholder="1994-02-05" onChange={(e) => this.handlechange(e)} />
              </Form.Group>
              <Button variant="secondary" type='submit' >Sign up</Button>
            </Form>

            <p>Already a user?</p>
            <p>
              <Link to='/signin'>
                <span>signin</span>
              </Link>
            </p>
          </section>
        </div>
      </div>
    )
  }

}

export default Signup;