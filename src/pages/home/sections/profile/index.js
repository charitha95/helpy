import React, { Component } from 'react';
import profile from '../../../../assets/svg/profile.svg';
import { Tabs, Tab } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

class Profile extends Component {
  data = {
    labels: ['april-27', 'april-29', 'april-28', 'may-1', 'may-2'],
    datasets: [{
      label: 'Happiness',
      data: [1, 2, 4, 4, 6],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
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
            <Line data={this.data} />
          </Tab>
          <Tab eventKey="feed" title='Stats'>

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