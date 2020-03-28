import React, { Component } from 'react';
import signin from '../../assets/imgs/taxi-sign-up.png'
import { Form, Button } from 'react-bootstrap';
class UserNote extends Component {

  constructor() {
    super();
    this.state = {
      userNote : ''
    }
  }

  handleChange(e) {

  }

  async handleSubmit(e) {
    
  }


  render() {
    return (
      <div className='page-padding-x page-padding-y page-wrapper primary-background'>
        <div className='signin-page'>
          <figure>
            <img src={signin} alt='signin' />
          </figure>
          <section className='signin-container'>
            <h3>Hello</h3>
            <p>Getting to know you better</p>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Group controlId="formGroupNote">
                <Form.Label>How are you feeling at the moment?</Form.Label>
                <Form.Control as="textarea" rows="3" name='note' onChange={(e) => this.handleChange(e)} placeholder="something about you/situation" />
              </Form.Group>
              <Button variant="secondary" type='submit'>Sign in</Button>
            </Form>
          </section>
        </div>
      </div>
    )
  }
}

export default UserNote;