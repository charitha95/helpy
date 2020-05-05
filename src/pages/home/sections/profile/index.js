import React, { Component } from 'react';
import profile from '../../../../assets/svg/profile.svg';
import { Tabs, Tab } from 'react-bootstrap';
import GetTone from './sections/tone';


import UserChart from './sections/chart';
// import Speech from './sections/voice';
import { db, auth } from '../../../../services/firebase';

class Profile extends Component {
  state = {
    calls: []
  }
  componentDidMount() {
    db.ref(`users/${auth().currentUser.uid}`).once("value", user => {
      console.log(user.val())
      if (user.val().calls) {
        this.setState({ calls: user.val().calls }, () => {
          this.getRates();
        });
      } else {
        console.log('no calls found')
      }
      // const toneParams = {
      //   toneInput: { 'text': latesUserThoughts },
      //   contentType: 'application/json',
      // };

      // toneAnalyzer.tone(toneParams)
      //   .then(toneAnalysis => {
      //     console.log(toneAnalysis.result)
      //     setTones(toneAnalysis.result.document_tone.tones);
      //     setCanStart(true);
      //   })
      //   .catch(err => {
      //     console.log('error:', err);
      //   });
    });
  }

  getRates = () => {
    const scoreArr = [];
    const titleArr = [];
    if (this.state.calls) {
      this.state.calls.forEach(call => {
        let score = 0;
        call.tonesAfterCall.map(tone => {
          switch (tone.tone_id) {
            case 'sadness':
              return score += -5;
            case 'fear':
              return score += -10;
            case 'anger':
              return score += -5;
            case 'tentative':
              return score += 2;
            case 'joy':
              return score += 10;
            case 'confident':
              return score += 15;
            case 'analytical':
              return score += 5;
            default:
              return score;
          }
        });
        console.log(score)
        scoreArr.push(score);
        titleArr.push(call.date.replace('-2020', ''))
      })
    }
    console.log(scoreArr)
    console.log(titleArr)
  }

  render() {
    return <div className='profile-page'>
      <h4>Profile</h4>
      <section className='profile-image'>
        <img src={profile} alt='user' />
        <p>{this.props.user.display_name}</p>
      </section>
      <section className='dashboard'>
        <Tabs defaultActiveKey="overall">
          <Tab eventKey="overall" title='Overall'>
            <UserChart />
          </Tab>
          <Tab eventKey="feed" title='Stats' >
            <GetTone />
          </Tab>
          {/* <Tab eventKey="activity" title='Speech'>
           <Speech/>
          </Tab> */}
        </Tabs>
      </section>

    </div>
  }
}

export default Profile;