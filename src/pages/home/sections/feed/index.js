import React, { Component } from 'react';
import { storage } from '../../../../services/firebase';

class Feed extends Component {

  changeHandler(evt) {
    const file = evt.target.files[0];
    const storageRef = storage.ref(file.name);
    storageRef.put(file).then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        console.log(url);
      });
  }

  render() {
    return (
      <div className='feed-page'>
        <section className='upload'>
          <input type="file" accept="image/*" capture="camera" id="cameraInput" onChange={(e) => this.changeHandler(e)} />
        </section>
      </div>
    )
  }
}

export default Feed;