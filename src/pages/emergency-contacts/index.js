import React, { Component } from 'react';
import signin from '../../assets/imgs/taxi-sign-up.png'
import { Form, Button } from 'react-bootstrap';
import { db, auth } from '../../services/firebase';
import { withRouter } from 'react-router-dom';

class EmergencyContacts extends Component {

  constructor() {
    super();
    this.state = {
      emergency: {
        name: '',
        phone: '',
        relationship: ''
      },
      rTypes: []
    }
  }

  componentDidMount() {
    db.ref("relationship_types").on("value", snapshot => {
      let relationshipTypes = [];
      snapshot.forEach(snap => {
        relationshipTypes.push(snap.key);
      });
      this.setState({
        rTypes: relationshipTypes
      })
    });
  }

  handleChange(e) {
    const contant = {...this.state.emergency}
    contant[e.target.name] = e.target.value
    this.setState({
      emergency: contant
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const uid = auth().currentUser.uid;
    db.ref(`users/${uid}/emergancy_contact`).set(
      [this.state.emergency]
    ).then(() => {
      this.props.history.push('/home')
    });
  }


  render() {
    return (
      <div className='page-padding-x page-padding-y page-wrapper primary-background'>
        <div className='emergency-page'>
          <figure>
            <img src={signin} alt='signin' />
          </figure>
          <section className='emergency-container'>
            <h3>Hello</h3>
            <p>Emergency contact details</p>
            <Form>
              <Form.Group controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' type="text" placeholder="dinu" onChange={e => this.handleChange(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupContactNUmber">
                <Form.Label>Phone</Form.Label>
                <Form.Control name='phone' type="number" placeholder="775859652" onChange={e => this.handleChange(e)} />
              </Form.Group>
              <Form.Group controlId="formGroupContactNUmber">
                <Form.Label>Relationship</Form.Label>
                <div onChange={e => { this.handleChange(e) }}>
                  {this.state.rTypes.map((type, ind) =>
                    <Form.Check key={ind}
                      custom
                      type="radio"
                      label={type}
                      name="relationship"
                      id={`id_${ind}`}
                      value={type}
                    />)
                  }
                </div>
              </Form.Group>
              <Button variant="secondary" type='submit' onClick={e => this.handleSubmit(e)}>Make My First Call</Button>
            </Form>
          </section>
        </div>
      </div>
    )
  }
}

export default withRouter(EmergencyContacts);