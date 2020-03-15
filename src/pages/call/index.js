import React, { useEffect, useState } from 'react';
import relationship from '../../assets/imgs/taxi-searching.png';
import health from '../../assets/imgs/taxi-5.png';
import career from '../../assets/imgs/taxi-teamwork-in-office.png';
import family from '../../assets/imgs/taxi-family.png';
import interpersonal from '../../assets/imgs/taxi-coffee-break.png';
import parenting from '../../assets/imgs/downloading-5.png';
import finantial from '../../assets/imgs/payment-processed-4.png';
import gender from '../../assets/imgs/taxi-no-connection.png';
import ReactStopwatch from 'react-stopwatch';
import queryString from 'query-string';

import { Link, withRouter } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../assets/svg/back.svg'
import { Button } from 'react-bootstrap';

const Call = ({ location }) => {

  return (
    <div className='page-padding-x page-padding-y page-wrapper white-background'>

      <div className='call-page'>
        <Link to='/home'>
          <section className='header'>
            <div className='back-button'>
              <BackIcon />
            </div>
            <label>Call</label>
          </section>
        </Link>
        <section className='type-container'>
          <figure>
            <img src={relationship} alt='type' />
          </figure>
          <div className='text-container'>
            <h3>Relationship</h3>
            <p>you have connected with <span>shan</span></p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default withRouter(Call);