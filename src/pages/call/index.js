
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
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  useEffect(() => {
    console.log('hit uese effect')
    console.log(selectedCall)
    setProvider(localStorage.getItem('isProvider') === 'true');
    getAndUpdateAvailableCalls();
    setPropData();
    if (localStorage.getItem('isProvider') !== 'true') {
      if (selectedCall.isStarted) {
        startSpeechToText();
      }
    }
    // eslint-disable-next-line
  }, [selectedCall.isStarted]);




  const startSpeechToText = () => {
    recognition.continuous = true;
    recognition.interimResults = true;
    const onResult = event => {
      const result = document.getElementById("result-block");
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
    };
    recognition.addEventListener("result", onResult);

    recognition.start();
  }

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
              console.log(toneAnalysis.result)
              setTones(toneAnalysis.result.document_tone.tones);
              setCanStart(true);
            })
            .catch(err => {
              console.log('error:', err);
            });
        });
      }
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
    console.log(voiceText);
    // testing
    // voiceText = `Hi, I am feeling really insecure lately and I know it’s dumb but I read comments on other women’s stuff and it’s so 
    // hard to not be jealous and it makes me hate myself. Anyway, here’s an older pic of me!!! Trying to teach myself that 
    // someone else’s beauty doesn’t take away from mine.`;
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



    // db.ref(`calls/${qString.type}/available/0`).once("value", snapshot => {
    //   snapshot.ref.remove();
    // });


    // history.push(`/home-provider`);

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

        {selectedCall.isStarted && <div id="result-block">listing..</div>}


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