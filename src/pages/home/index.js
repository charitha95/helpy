import React from 'react';
import relationship from '../../assets/imgs/taxi-searching.png';
import health from '../../assets/imgs/taxi-5.png';
import career from '../../assets/imgs/taxi-teamwork-in-office.png';
import family from '../../assets/imgs/taxi-family.png';
import interpersonal from '../../assets/imgs/taxi-coffee-break.png';
import parenting from '../../assets/imgs/downloading-5.png';
import finantial from '../../assets/imgs/payment-processed-4.png';
import gender from '../../assets/imgs/taxi-no-connection.png';
import { Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <div className='page-padding-x page-padding-y page-wrapper white-background'>
      <div className='home-page'>
        <section className='title'>
          <h3>Hello Dinu!</h3>
          <p>How can we help you?</p>
        </section>
        <section className='components'>
          <Row>
            <Col>
              <div className='component'>
                <figure>
                  <img src={relationship} alt='component' />
                </figure>
                <label>Relationship</label>
              </div>
            </Col>
            <Col>
              <div className='component'>
                <figure>
                  <img src={health} alt='component' />
                </figure>
                <label>Health Issues</label>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className='component'>
                <figure>
                  <img src={career} alt='component' />
                </figure>
                <label>Career</label>
              </div>
            </Col>
            <Col>
              <div className='component'>
                <figure>
                  <img src={family} alt='component' />
                </figure>
                <label>Family</label>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className='component'>
                <figure>
                  <img src={interpersonal} alt='component' />
                </figure>
                <label>Interpersonal</label>
              </div>
            </Col>
            <Col>
              <div className='component'>
                <figure>
                  <img src={parenting} alt='component' />
                </figure>
                <label>Parenting</label>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className='component'>
                <figure>
                  <img src={finantial} alt='component' />
                </figure>
                <label>Finantial</label>
              </div>
            </Col>
            <Col>
              <div className='component'>
                <figure>
                  <img src={gender} alt='component' />
                </figure>
                <label>Gender Identity</label>
              </div>
            </Col>
          </Row>

        </section>
      </div>
    </div>
  )
}

export default Home;