import React from 'react';
import guide_1 from '../../assets/imgs/no-connection-6.png'
import guide_2 from '../../assets/imgs/taxi-waiting.png'
import guide_3 from '../../assets/imgs/taxi-4.png'
import { Button, Carousel } from 'react-bootstrap';

function Guide() {
  return (
    <div className='page-padding-x page-padding-y guide-page-wrapper'>
      <div className="guide-page">
        <h3 className='title'>Helpy</h3>
        <div className='background-drop'>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={guide_1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>We Listen</h3>
                <p>we always hear your voice</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={guide_2}
                alt="second slide"
              />
              <Carousel.Caption>
                <h3>We Think</h3>
                <p>we will think for you, don't worry</p>
              </Carousel.Caption>
            </Carousel.Item>


            <Carousel.Item>
              <img
                className="d-block w-100"
                src={guide_3}
                alt="third slide"
              />
              <Carousel.Caption>
                <h3>Private</h3>
                <p>Helpy is always confidential</p>
              </Carousel.Caption>
            </Carousel.Item>

          </Carousel>
        </div>
        <div className='actions'>
          <Button variant="secondary">Get Help</Button>
          <Button variant="secondary">Give Help</Button>
        </div>

      </div>
    </div>
  )
}

export default Guide;