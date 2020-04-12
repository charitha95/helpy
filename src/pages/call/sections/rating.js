import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
function RatingModal({ show, handleModal, onSubmit, isProvider }) {

  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');


  function rateHandler(val) {
    setRating(val)
  }

  function changeHandler(e) {
    setNote(e.target.value)
  }

  return (
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
        <Button variant="primary" onClick={onSubmit.bind(null, { rating: rating, note: note })}>
          Submit
      </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RatingModal;