
import React, { Component } from 'react';
import signup from '../../assets/imgs/taxi-2.png'
import { Form, Button } from 'react-bootstrap';
import { signUp } from '../../helpers/auth';
import { db } from '../../services/firebase';
import { Link } from 'react-router-dom';

class SignupProvider extends Component {

  constructor() {
    super();
    this.state = {
      user: {
        email: '',
        password: ''
      },
      userTable: {
        userName: '',
        phone: '',
        birthDay: '',
        proficiency: ['relationship', 'health', 'career']
      }
    }
  }

  handleChangeUser(e) {
    const user = { ...this.state.user }
    user[e.target.name] = e.target.value
    this.setState({
      user: user
    });
  }

  handleChange(e) {
    const userTable = { ...this.state.userTable }
    userTable[e.target.name] = e.target.value
    this.setState({
      userTable: userTable
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    try {
      signUp(this.state.user.email, this.state.user.password).then(res => {
        this.saveUserData(res.user.uid);
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  saveUserData(uid) {
    db.ref(`listeners/${uid}`).set({
      user_name: this.state.userTable.userName,
      birth_day: this.state.userTable.birthDay,
      mobile: this.state.userTable.phone,
      proficiency: this.state.userTable.proficiency
    }).then(res => {
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
            <h3>Sign up</h3><span>(provider)</span>
            <Form autoComplete='off' onSubmit={(e) => this.handleSubmit(e)} >
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name='email' type="email" placeholder="dinu@email.com" onChange={e => this.handleChangeUser(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="o o o o o" onChange={e => this.handleChangeUser(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupDname">
                <Form.Label>Display name</Form.Label>
                <Form.Control name='userName' type="text" placeholder="dinu perera" onChange={(e) => this.handleChange(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control name='phone' type="number" placeholder="773592055" onChange={(e) => this.handleChange(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupBday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control name='birthDay' type="text" placeholder="1994-02-05" onChange={(e) => this.handleChange(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupBday">
                <Form.Label>Language(s) spoken</Form.Label>
                <Form.Check
                  custom
                  type="checkbox"
                  label='Sinhala'
                  name="languages"
                  id={`id_s`}
                  value='Sinhala'
                />
                <Form.Check
                  custom
                  type="checkbox"
                  label='English'
                  name="languagee"
                  id={`id_e`}
                  value='English'
                />
                <Form.Check
                  custom
                  type="checkbox"
                  label='Tamil'
                  name="languaget"
                  id={`id_t`}
                  value='Tamil'
                />
              </Form.Group>
              <Button variant="secondary" type='submit' >Sign up</Button>
            </Form>

            <p>Already a user?</p>
            <p>
              <Link to='/signin-provider'>
                <span>signin</span>
              </Link>
            </p>
          </section>
        </div>
      </div>
    )
  }

}

export default SignupProvider;