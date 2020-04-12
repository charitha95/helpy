import React, { Component } from 'react';
// import { db, auth } from '../../../../services/firebase';

class Activity extends Component {
  render() {
    return (
      <div className='timeline-page'>
        {this.props.user &&

          <ul>
            {this.props.user.calls.map(call =>
              <li key={call.startedTime}>
                <div className="content">
                  <h3>Type: <span>{call.type}</span> </h3>
                  <h3>Duration: <span>{call.duration}</span></h3>
                  <h3>Rating: <span>{call.user_rating ? call.user_rating + '/5' : '-'}</span></h3>
                  <p>{call.provider_note ? call.provider_note : 'Note not found!'}</p>
                </div>
                <div className="time">
                  <h4>{call.date}</h4>
                </div>
              </li>
            )}
            <div className='clear-both' ></div>
          </ul>
        }

      </div>
    )
  }

}

export default Activity;