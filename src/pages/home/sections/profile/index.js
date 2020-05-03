import React, { Component } from 'react';
import profile from '../../../../assets/svg/profile.svg';
import { Tabs, Tab } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import toneAnalyzer from '../../../helpers/watson';

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

  text = `my name is Julia and I'm 19 years old in 2017 was diagnosed with major 
  depressive disorder I almost lost this battle I didn't think it was gonna get better 
  but it did I've had anxiety since I was a little kid I always had this feeling that 
  something terrible was gonna happen and that presented itself and tightness in my 
  chest I'd get really shaky I would have a lot of stomach pain those were the physical
   ways that it came out for the longest time I didn't know that was my anxiety I just 
   knew that was something that happened to me around middle school I started to get
    depressed and it progressively got worse as I got into high school everything just 
    seemed kind of grey and a lot of worthlessness too I don't have anything to offer 
    from the outside I think I hit it pretty well I was a straight-a student I hung out 
    with my friends I babysat all the time I was involved in my church youth group I 
    didn't let people see that there was something going on that was what stayed closed 
    behind my bedroom door things started to feel more heavy I started to self-harm 
    as a way to cope I started having suicidal ideation I told my mom I don't think 
    I can keep myself safe and I know my parents were shocked when they knew how 
    bad it actually was it was on a Sunday night my mom called children's their 
    hotline I was evaluated by a social worker and I think it was honestly the first 
    time I was completely open about what was happening and I told my social worker 
    that I didn't necessarily want to die and I knew that I needed a break from what was
     happening from all the things I was feeling and death seems like the only option 
     I just remember crying to her and being like I don't know what else to do like I'm 
     stuck [Music] here I was completely broken I could barely see the point in staying 
     alive I felt so ashamed of myself and these people they just treated me like a person
      I felt validated and I had some hope and like you know I knew that like okay when.`;

  toneParams = {
    toneInput: { 'text': this.text },
    contentType: 'application/json',
  };

  componentDidMount() {
   
  }

  cons = () => {
    toneAnalyzer.tone(this.toneParams)
    .then(toneAnalysis => {
      console.log(JSON.stringify(toneAnalysis, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });
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
          <Tab eventKey="feed" title='Stats' >
aa
          </Tab>
          {/* <Tab eventKey="activity" title='hdome'>
          act
        </Tab> */}
        </Tabs>
      </section>
      <button onClick={this.cons}>aaa</button>
    </div>
  }
}

export default Profile;