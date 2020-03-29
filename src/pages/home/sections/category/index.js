import React, { Component } from 'react'
import relationship from '../../../../assets/imgs/taxi-searching.png';
import health from '../../../../assets/imgs/taxi-5.png';
import career from '../../../../assets/imgs/taxi-teamwork-in-office.png';
import family from '../../../../assets/imgs/taxi-family.png';
import interpersonal from '../../../../assets/imgs/taxi-coffee-break.png';
import parenting from '../../../../assets/imgs/downloading-5.png';
import finantial from '../../../../assets/imgs/payment-processed-4.png';
import gender from '../../../../assets/imgs/taxi-no-connection.png';
import Zoom from 'react-reveal/Zoom';
import { Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { db, auth } from '../../../../services/firebase';

class Category extends Component {

  constructor() {
    super();
    this.state = {
      requests: {}
    }
  }

  componentDidMount() {
    db.ref("requests").on("value", snapshot => {
      const reqs = {};
      snapshot.forEach(snap => { reqs[snap.key] = Number(snap.val()) });
      this.setState({
        requests: reqs
      })
    });
  }

  handleClick(value) {
    this.openCallConnection(value).then(() => {
      this.updateRequests(value).then(() => {
        // this.props.history.push(`/call?type=${value}`);
      });
    })
  }

  async openCallConnection(value) {
    const availableCalls = await this.getAvailableCalls(value);
    availableCalls.push({
      user_id: auth().currentUser.uid,
      provider_id: ''
    })
    return db.ref(`calls/${value}/available`).set(
      availableCalls
    )
  }

  getAvailableCalls(value) {
    let list = []
    db.ref(`calls/${value}/available`).on("value", snapshot => {
      list = snapshot.val()
    });
    return list;
  }

  updateRequests(value) {
    const reqs = { ...this.state.requests }
    const currentOpennings = reqs[value];
    return db.ref(`requests/${value}`).set(currentOpennings + 1)
  }


  render() {
    return <div className='category-page'>
      <section className='title'>
        <h3>Hello {this.props.user.display_name}!</h3>
        <p>How can we help you?</p>
      </section>
      <section className='components'>
        <Zoom cascade>
          <Row>
            <Col>
              <div className='component' onClick={() => this.handleClick('relationship')}>
                <figure>
                  <img src={relationship} alt='component' />
                </figure>
                <label>Relationship</label>
              </div>
            </Col>
            <Col>
              <Link to={'/call?type=health'}>
                <div className='component'>
                  <figure>
                    <img src={health} alt='component' />
                  </figure>
                  <label>Health Issues</label>
                </div>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col>
              <Link to={'/call?type=career'}>
                <div className='component'>
                  <figure>
                    <img src={career} alt='component' />
                  </figure>
                  <label>Career</label>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={'/call?type=family'}>
                <div className='component'>
                  <figure>
                    <img src={family} alt='component' />
                  </figure>
                  <label>Family</label>
                </div>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col>
              <Link to={'/call?type=interpersonal'}>
                <div className='component'>
                  <figure>
                    <img src={interpersonal} alt='component' />
                  </figure>
                  <label>Interpersonal</label>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={'/call?type=parenting'}>
                <div className='component'>
                  <figure>
                    <img src={parenting} alt='component' />
                  </figure>
                  <label>Parenting</label>
                </div>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col>
              <Link to={'/call?type=finantial'}>
                <div className='component'>
                  <figure>
                    <img src={finantial} alt='component' />
                  </figure>
                  <label>Finantial</label>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={'/call?type=gender'}>
                <div className='component'>
                  <figure>
                    <img src={gender} alt='component' />
                  </figure>
                  <label>Gender Identity</label>
                </div>
              </Link>
            </Col>
          </Row>

        </Zoom>

      </section>
    </div>
  }
}

export default withRouter(Category);