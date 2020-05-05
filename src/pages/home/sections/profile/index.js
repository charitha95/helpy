import React, { Component } from 'react';
import profile from '../../../../assets/svg/profile.svg';
import { Tabs, Tab } from 'react-bootstrap';
import GetTone from './sections/tone';


import UserChart from './sections/chart';
import Speech from './sections/voice';

class Profile extends Component {

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
          <Tab eventKey="activity" title='Speech'>
           <Speech/>
          </Tab>
        </Tabs>
      </section>

    </div>
  }
}

export default Profile;