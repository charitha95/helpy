import React, { Component } from 'react';
import signin from '../../assets/imgs/taxi-sign-up.png'
import { Form, Button } from 'react-bootstrap';
import { signIn } from '../../helpers/auth';
import { Link } from 'react-router-dom';
// signOut
class SigninProvider extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null
    }
  }

  // componentDidMount () {
  //   signOut()
  // }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      await signIn(this.state.email, this.state.password)
    } catch (error) {
      this.setState({
        error: error
      })
      console.log(error)
    }
  }

  render() {
    return (
      <div className='page-padding-x page-padding-y page-wrapper primary-background'>
        <div className='signin-page'>
          <figure>
            <img src={signin} alt='signin' />
          </figure>
          <section className='signin-container'>
            <h3>Sign in</h3><span>(provider)</span>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>User name </Form.Label>
                <Form.Control type="text" name='email' onChange={(e) => this.handleChange(e)} placeholder="dinu perera" />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' onChange={(e) => this.handleChange(e)} placeholder="o o o o o" />
              </Form.Group>
              <Button variant="secondary" type='submit'>Sign in</Button>
            </Form>
            <p>Don't have an account?</p>
            <p>
              <Link to='/signup-provider'>
                <span>signup</span>
              </Link>
            </p>
          </section>
        </div>
      </div>
    )
  }
}

export default SigninProvider;