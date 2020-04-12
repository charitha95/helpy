import React, { useState, useEffect } from 'react';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/conv.svg';
import { ReactComponent as UserIcon } from '../../assets/svg/user.svg';
import { ReactComponent as FeedIcon } from '../../assets/svg/feed.svg';
import { Tabs, Tab } from 'react-bootstrap';
import { Activity, Category } from './sections'
import { signOut } from '../../helpers/auth';
import { withRouter } from 'react-router-dom';
import { auth, db } from '../../services/firebase';
import Feed from './sections/feed';

function Home({ history }) {

  const [user, setUser] = useState('');

  localStorage.setItem('isProvider', false);

  useEffect(() => {
    // get all users
    db.ref(`users/${auth().currentUser.uid}`).on('value',
      snap => setUser(snap.val()));
  }, []);

  const logout = (e) => {
    e.preventDefault();
    signOut();
  }

  const goTo = (val) => {
    history.push(val)
  }

  const loadUser = () => {
    console.log(auth().currentUser)

  }

  return (
    <div className='page-padding-x page-padding-y page-wrapper white-background'>

      <Tabs defaultActiveKey="home">
        <Tab eventKey="home" title={<HomeIcon />}>
          <Category user={user} />
        </Tab>
        <Tab eventKey="feed" title={<FeedIcon />}>
          <Feed user={user}/>
        </Tab>
        <Tab eventKey="activity" title={<ListIcon />}>
          <Activity user={user}/>
        </Tab>
        <Tab eventKey="contact" title={<UserIcon />}>
          {/* <button onClick={(e) => logout(e)}>log out</button>
          <button onClick={() => goTo('/emergency-contact')}>go to emergancy</button>
          <button onClick={() => loadUser()}>load user</button> */}
        </Tab>
      </Tabs>
    </div>
  )
}

export default withRouter(Home);