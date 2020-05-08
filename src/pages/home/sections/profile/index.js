import React, { Component } from 'react';
import profile from '../../../../assets/svg/profile.svg';
import { Tabs, Tab } from 'react-bootstrap';
import GetTone from './sections/tone';


import UserChart from './sections/chart';
// import Speech from './sections/voice';
import { db, auth } from '../../../../services/firebase';

class Profile extends Component {
  state = {
    calls: [],
    values: [],
    dates: []
  }
  componentDidMount() {
    db.ref(`users/${auth().currentUser.uid}`).once("value", user => {
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
        if (call.tonesAfterCall) {
          call.tonesAfterCall.map(tone => {
            switch (tone.tone_id) {
              case 'sadness':
                return score += -5;
              case 'fear':
                return score += -10;
              case 'anger':
                return score += -5;
              // case 'tentative':
              //   return score += 0;
              case 'joy':
                return score += 10;
              case 'confident':
                return score *= 1.5;
              case 'analytical':
                return score *= 1.5;
              default:
                return score;
            }
          });
        } 
        scoreArr.unshift(score);
        titleArr.unshift(call.date.replace('-2020', ''))
        this.setState({dates: [...titleArr], values: [...scoreArr]})
      })
    }

    // based on the previous calls user had with listners, helpy application creates a unique chart to monitor user's progress. 
    // To create this progress graph helpy application uses a scoring algorithm. 
    // above code explains the scoring system of the user progress based on the tones user had after each call.
    // Takes all privous calls and loop through tones and give a scoring to each tone.
    // there are two flavours in scoring respectively positive or negative. if the user's thoughts/tones on nagative side
    // it will calculate with negative scorings and if the user's thoughts/tones on positive side it will calculate with positive scoring.
    // for both flavours is the given call has confident tone in it then it will multiply score by 1.5. 
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
            <UserChart dates={this.state.dates} values={this.state.values}/>
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