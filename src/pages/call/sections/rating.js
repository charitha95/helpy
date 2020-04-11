import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarAndCrescent, faStar } from '@fortawesome/free-solid-svg-icons'
function RatingModal({ show, handleModal, rateHandler }) {
  return (
    <Modal show={show} onHide={handleModal} centered className='rating-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Rate Receiver</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please rate quality of the conversation </p>
        <Rating
          onClick={rateHandler}
          emptySymbol={<FontAwesomeIcon icon={faStar} color='antiquewhite' size='2x' />}
          fullSymbol={<FontAwesomeIcon icon={faStar} color='#fece2f' size='2x' />}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
      </Button>
        <Button variant="primary" onClick={handleModal}>
          Submit
      </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RatingModal;