import React, { Component } from 'react';
import signin from '../../assets/imgs/taxi-sign-up.png'
import { Form, Button } from 'react-bootstrap';
import { db, auth } from '../../services/firebase';

class UserNote extends Component {

  constructor() {
    super();
    this.state = {
      userNote: ''
    }
  }

  handleChange(e) {
    this.setState({
      userNote: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const uid = auth().currentUser.uid;
    const user = {};
    db.ref(`users/${uid}`).on("value", snapshot => {
      snapshot.forEach(snap => {
        user[snap.key] = snap.val()
      });
      db.ref(`users/${uid}`).set({
        user_note: this.state.userNote,
        ...user
      }).then(res => {
        console.log(res);
      });
    });

  }


  render() {
    return (
      <div className='page-padding-x page-padding-y page-wrapper primary-background'>
        <div className='user-note-page'>
          <figure>
            <img src={signin} alt='signin' />
          </figure>
          <section className='user-note-container'>
            <h3>Hello</h3>
            <p>Getting to know you better</p>
            <Form>
              <Form.Group controlId="formGroupNote">
                <Form.Label>How are you feeling at the moment?</Form.Label>
                <Form.Control as="textarea" rows="10" name='note' onChange={this.handleChange.bind(this)} placeholder="something about you/situation" />
              </Form.Group>
              <Button variant="secondary" type='submit' onClick={(e) => this.handleSubmit(e)}>Next</Button>
            </Form>
          </section>
        </div>
      </div>
    )
  }
}

export default UserNote;