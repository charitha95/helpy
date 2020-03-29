import React, {useState, useEffect} from 'react';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/list.svg';
import { ReactComponent as UserIcon } from '../../assets/svg/user.svg';
import { Tabs, Tab } from 'react-bootstrap';
import { Activity, Category } from './sections'
import { signOut } from '../../helpers/auth';
import { db, auth } from '../../services/firebase';

function Home() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    db.ref(`users/${auth().currentUser.uid}/display_name`).on("value", username => setUserName(username.val()));
  }, []);

  const logout = (e) => {
    e.preventDefault();
    signOut();
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
        </Tab>
      </Tabs>
    </div>
  )
}

export default Home;