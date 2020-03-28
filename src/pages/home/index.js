import React from 'react';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/list.svg';
import { ReactComponent as UserIcon } from '../../assets/svg/user.svg';
import { Tabs, Tab } from 'react-bootstrap';
import { Activity, Category } from './sections'
import { signOut } from '../../helpers/auth';
import { db, auth } from '../../services/firebase';

function Home() {
  const logout = (e) => {
    e.preventDefault();
    // const uid = auth().currentUser.uid;
    // db.ref(`users/${uid}`).on("value", snapshot => {
    //   let allNotes = [];
    //   snapshot.forEach(snap => {
    //     allNotes.push(snap.val());
    //   });
    //   console.log(allNotes)
    // });
    signOut();
  }

  return (
    <div className='page-padding-x page-padding-y page-wrapper white-background'>

      <Tabs defaultActiveKey="home">
        <Tab eventKey="home" title={<HomeIcon />}>
          <Category />
        </Tab>
        <Tab eventKey="activity" title={<ListIcon />}>
          <Activity />
        </Tab>
        <Tab eventKey="contact" title={<UserIcon />}>
          <button onClick={(e) => logout(e)}>log out</button>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Home;