import React, { useState, useEffect } from 'react';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/list.svg';
import { ReactComponent as UserIcon } from '../../assets/svg/user.svg';
import { Tabs, Tab } from 'react-bootstrap';
import { Activity, Category } from './sections'
import { signOut } from '../../helpers/auth';
import { withRouter } from 'react-router-dom';
import { auth, db } from '../../services/firebase';

function HomeProvider({ history }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    db.ref(`listeners/${auth().currentUser.uid}/user_name`).on('value',
      snap => setUserName(snap.val()))
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
          <Category userName={userName} />
        </Tab>
        <Tab eventKey="activity" title={<ListIcon />}>
          <Activity />
        </Tab>
        <Tab eventKey="contact" title={<UserIcon />}>
          <button onClick={(e) => logout(e)}>log out</button>
          <button onClick={() => goTo('/emergency-contact')}>go to emergancy</button>
          <button onClick={() => loadUser()}>load user</button>
        </Tab>
      </Tabs>
    </div>
  )
}

export default withRouter(HomeProvider);