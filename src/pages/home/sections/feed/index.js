import React, { Component } from 'react';
import { storage, db } from '../../../../services/firebase';
import { ReactComponent as Upload } from '../../../../assets/svg/upload.svg';
import { Carousel, Row, Col } from 'react-bootstrap';
class Feed extends Component {
  constructor() {
    super();
    this.state = {
      featured: [],
      userUploaded: []
    }
  }

  componentDidMount() {
    db.ref('feed/featured').on("value", snapshot => {
      this.setState({ featured: snapshot.val() })
    });

    db.ref('feed/user_uploaded').on("value", snapshot => {
      this.setState({ userUploaded: snapshot.val() })
    });
  }

  changeHandler(evt) {
    const file = evt.target.files[0];
    const storageRef = storage.ref(file.name);
    storageRef.put(file).then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        this.updateImageDB(url)
      });
  }

  updateImageDB(url) {
    db.ref('feed/user_uploaded').once("value", snapshot => {
      let images = snapshot.val();
      if (!images) {
        images = [];
      }
      images.unshift(url);
      db.ref('feed/user_uploaded').set(images);
    });
  }

  render() {
    return (
      <div className='feed-page'>
        <div className='carousel-wrapper'>
          <h3>Featured</h3>
          <section className='carousel'>
            <Carousel interval={null}>
              {this.state.featured && this.state.featured.map((img, index) =>
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={index + '_im'}
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </section>
        </div>
        <div className='user-uploads'>
          <Row>
            {this.state.userUploaded && this.state.userUploaded.map((img, index) =>
              <Col xs={6} key={index}>
                <div className='image-wrapper'>
                  <img src={img} />
                </div>
              </Col>
            )}
          </Row>

        </div>
        <div className='input-wrapper'>
          <Upload />
          <input type="file" accept="image/*" capture="camera" id="cameraInput" onChange={(e) => this.changeHandler(e)} />
        </div>
      </div >
    )
  }
}

export default Feed;