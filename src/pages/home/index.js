import React from 'react';
import relationship from '../../assets/imgs/taxi-searching.png';
import health from '../../assets/imgs/taxi-5.png';
import career from '../../assets/imgs/taxi-teamwork-in-office.png';
import family from '../../assets/imgs/taxi-family.png';
import interpersonal from '../../assets/imgs/taxi-coffee-break.png';
import parenting from '../../assets/imgs/downloading-5.png';
import finantial from '../../assets/imgs/payment-processed-4.png';
import gender from '../../assets/imgs/taxi-no-connection.png';
import Zoom from 'react-reveal/Zoom';

import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/list.svg';
import { ReactComponent as UserIcon } from '../../assets/svg/user.svg';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='page-padding-x page-padding-y page-wrapper white-background'>

      <Tabs defaultActiveKey="home">
        <Tab eventKey="home" title={<HomeIcon />}>



          <div className='home-page'>
            <section className='title'>
              <h3>Hello Dinu!</h3>
              <p>How can we help you?</p>
            </section>
            <section className='components'>
              <Zoom cascade>
                <Row>
                  <Col>
                    <Link to={'/call?type=relationship'}>
                      <div className='component'>
                        <figure>
                          <img src={relationship} alt='component' />
                        </figure>
                        <label>Relationship</label>
                      </div>
                    </Link>
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

              </Zoom>

            </section>
          </div>
        </Tab>
        <Tab eventKey="profile" title={<ListIcon />}>
          <p>Profile</p>
        </Tab>
        <Tab eventKey="contact" title={<UserIcon />}>
          <p>Contact</p>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Home;