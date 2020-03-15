import React from 'react';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/list.svg';
import { ReactComponent as UserIcon } from '../../assets/svg/user.svg';
import { Tabs, Tab } from 'react-bootstrap';
import { Activity, Category } from './sections'

function Home() {
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
          <p>Contact</p>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Home;