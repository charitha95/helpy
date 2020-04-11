
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
import { db, auth } from '../../services/firebase';
import RatingModal from './sections/rating';

const Call = ({ location, history }) => {

  const [data, setData] = useState({ name: 'Relationship', img: relationship })
  const [isProvider, setProvider] = useState(false)
  const [selectedCall, setSelectedCall] = useState({});
  const [show, setShow] = useState(false);

  const handleModal = () => setShow(!show);

  const qString = queryString.parse(location.search);

  (() => {
    db.ref(`calls/${qString.type}/completed`).on("value", snapshot => {
      console.log('call triggered, is pro:'+ isProvider)
    });
  })();

  useEffect(() => {
    setProvider(localStorage.getItem('isProvider') === 'true');
    getAndUpdateAvailableCalls();
    setPropData();
    // eslint-disable-next-line
  }, []);

  function getAndUpdateAvailableCalls() {
    db.ref(`calls/${qString.type}/available/0`).on("value", async snapshot => {
      if (localStorage.getItem('isProvider') === 'true') {
        await db.ref(`calls/${qString.type}/available/0`).set({
          user_id: snapshot.val().user_id,
          provider_id: auth().currentUser.uid,
          isStarted: true,
          isEnded: false
        });
      }
      setSelectedCall(snapshot.val());
      // update call

    });

  }

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


  function onSubmit(val) {
    setShow(!show);
    console.log(val)
  }

  function callEndHandler() {
    db.ref(`calls/${qString.type}/available/0`).once("value", snapshot => {
      snapshot.ref.remove();
    });
    handleModal();

    if (false) {
      //adds to the completed and remove from open
      db.ref(`calls/${qString.type}/available/0`).once("value", snapshot => {
        // get completed calls list
        db.ref(`calls/${qString.type}/completed`).once("value", compSnapshot => {

          let completedCalls = compSnapshot.val();

          // check for the first time
          if (!completedCalls) {
            completedCalls = [];
          }

          //push new call connection
          completedCalls.unshift({
            user_id: selectedCall.user_id,
            provider_id: auth().currentUser.uid
          });

          //save with new connection
          db.ref(`calls/${qString.type}/completed`).set(completedCalls);

          //remove from available
          snapshot.ref.remove();


        });
      });
    }

    // history.push(`/home-provider`);

  }

  return (
    <div className='page-padding-x page-padding-y page-wrapper white-background'>

      <RatingModal show={show} handleModal={handleModal} onSubmit={onSubmit} isProvider={isProvider} />

      <div className='call-page'>
        <Link to={isProvider ? '/home-provider' : '/home'}>
          <section className='header'>
            <div className='back-button'>
              <BackIcon />
            </div>
            <label>Call </label>
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
        <section className='counter' style={{ display: show ? 'none' : 'flex' }}>
          <div className="circle-ripple">
            {selectedCall &&
              selectedCall.isStarted ?
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
              :
              <p>Connecting</p>
            }

          </div>
        </section>

        <section className='footer'>
          {/* <Link to={isProvider ? '/home-provider' : '/home'}> */}
          <Button variant="secondary" onClick={callEndHandler}>End call</Button>
          {/* </Link> */}
        </section>
      </div>
    </div>
  )
}

export default withRouter(Call);