import React, { Component } from 'react';
import profile from '../../../../assets/svg/profile.svg';
import { Tabs, Tab } from 'react-bootstrap';

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
          overall
        </Tab>
        <Tab eventKey="feed" title='Stats'>
          Progress
        </Tab>
        {/* <Tab eventKey="activity" title='hdome'>
          act
        </Tab> */}
      </Tabs>
      </section>
    </div>
  }
}

export default Profile;