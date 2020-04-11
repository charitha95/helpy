
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
import { db } from '../../services/firebase';

const Call = ({ location }) => {

  const [data, setData] = useState({ name: 'Relationship', img: relationship })
  const [isProvider, setProvider] = useState(false)
  const [selectedCall, setSelectedCall] = useState({});

  const qString = queryString.parse(location.search);

  function setPropData() {
    switch (qString.type) {
      case 'relationship':
        setData({ name: 'Relationship', img: relationship })
        break;
      case 'health':
        setData({ name: 'Health', img: health })
        break;
      case 'career':
        setData({ name: 'Career', img: career })
        break;
      case 'family':
        setData({ name: 'Family', img: family })
        break;
      case 'interpersonal':
        setData({ name: 'Interpersonal', img: interpersonal })
        break;
      case 'parenting':
        setData({ name: 'Parenting', img: parenting })
        break;
      case 'finantial':
        setData({ name: 'Finantial', img: finantial })
        break;
      case 'gender':
        setData({ name: 'Gender', img: gender })
        break;
      default:
        break;
    }
  }

  function getAvailableCalls() {
    let list = []
    db.ref(`calls/${qString.type}/available`).on("value", snapshot => {
      list = snapshot.val()
      setSelectedCall(list[0]);
    });
    return list;
  }

  useEffect(() => {
    setProvider(localStorage.getItem('isProvider') === 'true');
    getAvailableCalls();
    setPropData();
    // eslint-disable-next-line
  }, []);

  function callEndHandler () {

  }

  async function clloseCallConnection() {
    const availableCalls = await this.getAvailableCalls(qString.type);
    
    availableCalls.push({
      user_id: selectedCall.user_id,
      provider_id: selectedCall.provider_id,
    })
    return db.ref(`calls/${qString.type}/available`).set(
      availableCalls
    )
  }

  return (
    <div className='page-padding-x page-padding-y page-wrapper white-background'>

      <div className='call-page'>
        <Link to={isProvider ? '/home-provider' : '/home'}>
          <section className='header'>
            <div className='back-button'>
              <BackIcon />
            </div>
            <label>Call </label>{selectedCall && selectedCall.user_id}
          </section>
        </Link>
        <section className='type-container'>
          <figure>
            <img src={data.img} alt='type' />
          </figure>
          <div className='text-container'>
            <h3>{data.name}</h3>
            <p>you have connected with <span>shan</span></p>
          </div>
        </section>
        <section className='counter'>
          <div className="circle-ripple">
            <ReactStopwatch
              seconds={0}
              minutes={0}
              hours={0}
              // onCallback={() => console.log('Finish')}
              render={({ formatted }) => {
                return (
                  <label>{formatted}</label>
                );
              }}
            />
          </div>
        </section>

        <section className='footer'>
          <Link to={isProvider ? '/home-provider' : '/home'}>
            <Button variant="secondary" onClick={callEndHandler}>End call</Button>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default withRouter(Call);