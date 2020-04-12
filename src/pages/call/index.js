
import React, { useEffect, useState } from 'react';
import relationship from '../../assets/imgs/taxi-searching.png';
import health from '../../assets/imgs/taxi-5.png';
import career from '../../assets/imgs/taxi-teamwork-in-office.png';
import family from '../../assets/imgs/taxi-family.png';
import interpersonal from '../../assets/imgs/taxi-coffee-break.png';
import parenting from '../../assets/imgs/downloading-5.png';
import finantial from '../../assets/imgs/payment-processed-4.png';
import gender from '../../assets/imgs/taxi-no-connection.png';
import Timer from 'react-compound-timer'
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
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const current_datetime = new Date();
  const formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear();

  const qString = queryString.parse(location.search);

  useEffect(() => {
    setProvider(localStorage.getItem('isProvider') === 'true');
    getAndUpdateAvailableCalls();
    setPropData();
    // eslint-disable-next-line
  }, []);

  const handleModal = () => setShow(!show);

  function getAndUpdateAvailableCalls() {
    const startedTime = Date.now()
    db.ref(`calls/${qString.type}/available/0`).on("value", async snapshot => {
      if (localStorage.getItem('isProvider') === 'true') {
        const upCall = { ...snapshot.val() }
        upCall.provider_id = auth().currentUser.uid;
        upCall.isStarted = true;
        upCall.type = qString.type;
        upCall.date = formatted_date;
        upCall.startedTime = startedTime;
        await db.ref(`calls/${qString.type}/available/0`).set({ ...upCall });
      }
      setSelectedCall(snapshot.val());
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
    const callMeta = { ...selectedCall };
    let route = '';

    if (isProvider) {
      callMeta.provider_rating = val.rating;
      callMeta.provider_note = val.note
      route = '/home-provider';
      db.ref(`requests/${qString.type}`).once("value", snapshot => {
        db.ref(`requests/${qString.type}`).set(snapshot.val() - 1);
      });
      updateUserCalls(callMeta, `users/${callMeta.user_id}/calls/`)
    } else {
      callMeta.user_rating = val.rating;
      route = '/home';
    }


    db.ref(`calls/${qString.type}/available/0`).set({ ...callMeta }).then(() => {
      history.push(route);
    });
  }

  function updateUserCalls(call, path) {
    return db.ref(path).once("value", snapshot => {
      let calls = snapshot.val();

      // check for the first time
      if (!calls) {
        calls = [];
      }

      //push new ended call connection to user/provider
      calls.unshift({ ...call });

      //save with new connection
      return db.ref(path).set(calls);
    });
  }

  function callEndHandler() {
    db.ref(`calls/${qString.type}/available/0`).once("value", snapshot => {
      const newCall = { ...selectedCall };
      newCall.isEnded = true
      newCall.endedTime = Date.now();

      const differenceDate = new Date(newCall.endedTime - newCall.startedTime);
      newCall.duration = differenceDate.getUTCHours() + ':' + differenceDate.getUTCMinutes() + ':' + differenceDate.getUTCSeconds()
      console.log(newCall.duration);

      const h = (current_datetime.getHours() < 10 ? '0' : '') + current_datetime.getHours(),
        m = (current_datetime.getMinutes() < 10 ? '0' : '') + current_datetime.getMinutes();
      newCall.time = `${h}:${m}`

      db.ref(`calls/${qString.type}/available/0`).set({ ...newCall }).then(() => {
        setSelectedCall({ ...newCall });
      });
    });

    // db.ref(`calls/${qString.type}/available/0`).once("value", snapshot => {
    //   snapshot.ref.remove();
    // });


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
            {
              selectedCall &&
                selectedCall.isEnded ? <p>Call is over! </p> :
                !selectedCall.isStarted ? <p>connecting to a  {isProvider ? 'user.' : 'provider.'} </p> : <p>Connected to a {isProvider ? 'user.' : 'provider.'}</p>
            }

          </div>
        </section>
        <section className='counter' style={{ display: selectedCall.isEnded || !selectedCall.isStarted ? 'none' : 'flex' }}>
          <div className="circle-ripple">
            {selectedCall.isStarted
              &&
              <Timer>
                <Timer.Hours />:
              <Timer.Minutes />:
              <Timer.Seconds />
              </Timer>
            }

          </div>
        </section>

        {selectedCall.isEnded &&
          <div className='duration'>
            <p>Call duration:<span> {selectedCall.duration}</span></p>
          </div>
        }




        <section className='footer'>
          {/* <Link to={isProvider ? '/home-provider' : '/home'}> */}
          {!selectedCall.isEnded ?
            <Button variant="secondary" onClick={callEndHandler}>End call</Button> :
            <Button variant="secondary" onClick={handleModal}>Rate call</Button>
          }
          {/* </Link> */}
        </section>
      </div>
    </div>
  )
}

export default withRouter(Call);