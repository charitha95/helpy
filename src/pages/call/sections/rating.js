import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { db } from '../../../services/firebase';
function RatingModal({ show, handleModal, onSubmit, isProvider, userId }) {

  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');
  const [eShow, setEShow] = useState(false);
  const [contacts, setContacts] = useState([])
  function handleEModal() {
    setEShow(!eShow)
  }
  function rateHandler(val) {
    setRating(val)
  }

  function changeHandler(e) {
    setNote(e.target.value)
  }

  useEffect(() => {
    if (userId) {
      db.ref(`users/${userId}/emergancy_contact`).once("value", snapshot => {
        setContacts(snapshot.val());
      });
    }
  }, [userId]);

  return (<>
    <Modal show={show} onHide={handleModal} centered className='rating-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Rate Receiver</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isProvider &&
          <>
            <p>Any notes/tips for the caller?</p>
            <Form.Group controlId="text">
              <Form.Control as="textarea" rows="3" value={note} onChange={(e) => changeHandler(e)} />
            </Form.Group>
          </>
        }

        <p>Please rate quality of the conversation </p>
        <Rating
          onClick={rateHandler}
          emptySymbol={<FontAwesomeIcon icon={faStar} color='antiquewhite' size='2x' />}
          fullSymbol={<FontAwesomeIcon icon={faStar} color='#fece2f' size='2x' />}
        />

      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleModal}>
          Close
      </Button> */}
        {isProvider &&
          <Button variant="primary" className='critical' onClick={handleEModal}>
            Critical
          </Button>
        }
        <Button variant="primary" onClick={onSubmit.bind(null, { rating: rating, note: note })}>
          Submit
      </Button>
      </Modal.Footer>
    </Modal>


    {/* emergency contact modal */}
    <Modal show={eShow} onHide={handleEModal} centered backdropClassName='emodal-backdrop' className='emergancy-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Emergancy Contacts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {contacts && contacts.map((contact, index) => {
          return <a key={index} href={`tel:${contact.phone}`}>Call {contact.relationship}</a>
        })}
      </Modal.Body>
    </Modal>

  </>
  )
}

export default RatingModal;