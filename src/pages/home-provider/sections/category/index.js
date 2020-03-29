import React from 'react'
import relationship from '../../../../assets/imgs/taxi-searching.png';
// import health from '../../../../assets/imgs/taxi-5.png';
// import career from '../../../../assets/imgs/taxi-teamwork-in-office.png';
// import family from '../../../../assets/imgs/taxi-family.png';
// import interpersonal from '../../../../assets/imgs/taxi-coffee-break.png';
// import parenting from '../../../../assets/imgs/downloading-5.png';
// import finantial from '../../../../assets/imgs/payment-processed-4.png';
// import gender from '../../../../assets/imgs/taxi-no-connection.png';
import Zoom from 'react-reveal/Zoom';
// import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Category = ({ userName }) => {
  return (
    <div className='category-provider-page'>
      <section className='title'>
        <h3>Hello {userName}!</h3>
        <p>there are users who need support from you right now</p>
      </section>
      <section className='components'>
        <Zoom cascade>
          <Link to={'/call?type=relationship'}>
            <div className='component help-component'>
              <section className='illustration'>
                <figure>
                  <img src={relationship} alt='component' />
                </figure>
                <label>Relationship</label>
              </section>
              <section className='count'>
                <h2>1</h2>
                <Button variant="secondary">Give Help</Button>
              </section>
            </div>
          </Link>
        </Zoom>

      </section>
    </div>
  )
}

export default Category;