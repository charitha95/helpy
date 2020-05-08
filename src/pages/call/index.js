
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
import toneAnalyzer from '../../helpers/watson';
import happyIcon from '../../assets/imgs/tones/happy.png';
import fearIcon from '../../assets/imgs/tones/fear.png';
import angerIcon from '../../assets/imgs/tones/anger.png';
import analyticalIcon from '../../assets/imgs/tones/analytical.png';
import confidentIcon from '../../assets/imgs/tones/confident.png';
import sadnessIcon from '../../assets/imgs/tones/sadness.png';
import tentativeIcon from '../../assets/imgs/tones/tentative.png';



const Call = ({ location, history }) => {

  const [data, setData] = useState({ name: 'Relationship', img: relationship })
  const [isProvider, setProvider] = useState(false)
  const [selectedCall, setSelectedCall] = useState({});
  const [show, setShow] = useState(false);
  const [tones, setTones] = useState([]);
  const [isCall, setIsCall] = useState(false);
  const [canStart, setCanStart] = useState(false);
  // const [isSpeechStopped, setIsSpeechStopped] = useState(false);
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const current_datetime = new Date();
  const formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear();
  const qString = queryString.parse(location.search);
  const images = {
    joy: happyIcon,
    fear: fearIcon,
    analytical: analyticalIcon,
    confident: confidentIcon,
    sadness: sadnessIcon,
    tentative: tentativeIcon,
    anger: angerIcon
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  // in order to record users voice helpy app initilize speech recognition with the help of SpeechRecognition Web API.
  // above codes creates the recognition object to use it later.

  useEffect(() => {
    setProvider(localStorage.getItem('isProvider') === 'true');
    getAndUpdateAvailableCalls();
    setPropData();
    if (localStorage.getItem('isProvider') !== 'true') {
      startSpeechToText();
    }
    return () => recognition.removeEventListener("result", onResult);
    // eslint-disable-next-line
  }, []);



  const startSpeechToText = () => {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.addEventListener("result", onResult);
    recognition.start();
  }
  
  const onResult = event => {
    const result = document.getElementById("result-block");
    if (result) {
      result.innerHTML = "";
      for (const res of event.results) {
        const text = document.createTextNode(res[0].transcript);
        const p = document.createElement("p");
        if (res.isFinal) {
          p.classList.add("translatedText");
        }
        p.appendChild(text);
        result.appendChild(p);
      }
    }
  };
  // after recognition is initiated with speechRecognition web api it allows to start the recording it.
  // above stated code used to create the event listner on DOM (document object model) and start the recoring. 
  // Once recording is started user's voice will evalute and will populate according on the user screen.

  recognition.onspeechstart = function () {
    console.log('Speech has been detected');
  }

  recognition.onspeechend = function () {
    console.log('Speech has stopped being detected');
  }

  recognition.onstart = function () {
    console.log('onstart');
  };

  recognition.onend = function () {
    console.log('onend');
    startSpeechToText();
  };

  recognition.onerror = function (event) {
    console.log('Error in speech', event);
    console.log('onerror');
  };

  const handleModal = () => setShow(!show);

  function getAndUpdateAvailableCalls() {
    db.ref(`calls/${qString.type}/available/0`).on("value", async snapshot => {
      if (localStorage.getItem('isProvider') === 'true') {
        db.ref(`users/${snapshot.val().user_id}`).once("value", user => {
          let latesUserThoughts = '';
          if (user.val().calls) {
            setIsCall(true)
            latesUserThoughts = user.val().calls[0].voiceText
          } else {
            latesUserThoughts = user.val().user_note;
          }
          const toneParams = {
            toneInput: { 'text': latesUserThoughts },
            contentType: 'application/json',
          };

          toneAnalyzer.tone(toneParams)
            .then(toneAnalysis => {
              setTones(toneAnalysis.result.document_tone.tones);
              setCanStart(true);
            })
            .catch(err => {
              console.log('error:', err);
            });
        });
      }
      // after successfully aauthenticated with ibm watson next is to use the tone analyzer in the helpy app. 
      // above piece of code explains how helpy app make requests against IBM tone analyzer to get tones and 
      // show to listners before he/she starts the call.  
      setSelectedCall(snapshot.val());
    });

  }

  const startCallFromProvider = () => {
    const startedTime = Date.now()
    db.ref(`calls/${qString.type}/available/0`).on("value", async snapshot => {
      if (localStorage.getItem('isProvider') === 'true') {
        const upCall = { ...snapshot.val() }
        upCall.provider_id = auth().currentUser.uid;
        upCall.isStarted = true;
        upCall.type = qString.type;
        upCall.date = formatted_date;
        upCall.startedTime = startedTime;
        upCall.providerName = qString.username;
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
      if (isProvider) {
        window.location.reload();
      }
      else {
        history.push(route);
      }
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
    recognition.stop();
    const nodes = document.getElementsByClassName('translatedText');
    let voiceText = '';
    for (let i = 0; i < nodes.length; i++) {
      voiceText += ` ${nodes[i].innerText}`
    }
    // testing
    voiceText = `Damnnnnn Kim!!! Great job! I’m speechless.  All logo concepts
     are great and bring a special “it” factor to our business. OMG… concept two
      gives me goose bumps. Not only have you combined our essence in the logo but you’ve managed to quiet my 
    skeptic partner as well! We both agree on concept 2. Great bold colors and
     beautiful simple design. I love it!! Once again you’ve hit it out of the park!`;
    const toneParams = {
      toneInput: { 'text': voiceText },
      contentType: 'application/json',
    };

    toneAnalyzer.tone(toneParams)
      .then(toneAnalysis => {
        const newTones = toneAnalysis.result.document_tone.tones
        db.ref(`calls/${qString.type}/available/0`).once("value", snapshot => {
          const newCall = { ...selectedCall };
          newCall.isEnded = true
          newCall.endedTime = Date.now();
          newCall.voiceText = voiceText;
          newCall.tonesBeforeCall = tones;
          newCall.tonesAfterCall = newTones;
          recognition.stop();
          const differenceDate = new Date(newCall.endedTime - newCall.startedTime);
          newCall.duration = differenceDate.getUTCHours() + ':' + differenceDate.getUTCMinutes() + ':' + differenceDate.getUTCSeconds()

          const h = (current_datetime.getHours() < 10 ? '0' : '') + current_datetime.getHours(),
            m = (current_datetime.getMinutes() < 10 ? '0' : '') + current_datetime.getMinutes();
          newCall.time = `${h}:${m}`

          db.ref(`calls/${qString.type}/available/0`).set({ ...newCall }).then(() => {
            setSelectedCall({ ...newCall });
          });
        });

      })
      .catch(err => {
        console.log('error:', err);
      });
  }

  return (
    <div className='page-padding-x page-padding-y page-wrapper white-background'>

      <RatingModal show={show} handleModal={handleModal} onSubmit={onSubmit} isProvider={isProvider} userId={selectedCall ? selectedCall.user_id : ''} />

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
                !selectedCall.isStarted ? <p>connecting to a  {isProvider ? 'user.' : 'provider.'} </p> : <p>Connected to a {isProvider ? 'user.' : `provider: ${selectedCall.providerName}`}</p>
            }
          </div>
        </section>
        <section className='counter' style={{ display: selectedCall.isEnded || !selectedCall.isStarted ? 'none' : 'flex', marginTop: isProvider ? '20px' : '130px' }}>
          <div className={`${isProvider ? '' : 'circle-ripple'}`}>
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

        <section className='provider-actions'>
          {isProvider && <div className='user-tones'>
            <p>User tones based on {isCall ? 'last call:' : 'user thoughts:'}</p>
            <div className='pills-wrapper'>
              {tones && tones.map((tone, indx) => {
                return <div key={indx} className={`tone-pill ${tone.tone_id}`}>
                  <img src={images[tone.tone_id]} alt='tone' />
                  <span>{tone.tone_name} - {tone.score.toFixed(2)}</span>
                </div>
              })}
            </div>
          </div>}
          {!selectedCall.isStarted && canStart && <Button variant="primary" onClick={startCallFromProvider}>Start call</Button>}

        </section>

        {selectedCall.isEnded &&
          <div className='duration'>
            <p>Call duration:<span> {selectedCall.duration}</span></p>
          </div>
        }

        <div id="result-block"></div>
        {/* <div className='retry'>
          <p onClick={startSpeechToText}>Retry</p>
        </div> */}

        <section className='footer'>
          {/* <Link to={isProvider ? '/home-provider' : '/home'}> */}
          {!selectedCall.isEnded ?
            selectedCall.isStarted && <Button variant="secondary" onClick={callEndHandler}>End call</Button> :
            <Button variant="secondary" onClick={handleModal}>Rate call</Button>
          }
          {/* </Link> */}
        </section>
      </div>
    </div>
  )
}

export default withRouter(Call);