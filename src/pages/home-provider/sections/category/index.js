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
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { db } from '../../../../services/firebase';

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
      snapshot.forEach(snap => { reqs[snap.key] = snap.val() });
      this.setState({
        requests: reqs
      })
    });
  }

  render() {
    return <div className='category-provider-page'>
      <section className='title'>
        <h3>Hello {this.props.user.user_name}!</h3>
        <p>there are users who need support from you right now.</p>
      </section>
      <section className='components'>
        <Zoom cascade>
          {
            this.props && this.props.user.proficiency && <>

              {this.props.user.proficiency.find(i => i === 'relationship') &&
                <Link to={'/call?type=relationship'} >
                  <div className={`component help-component ${this.props.user.proficiency.find(i => i === 'relationship') ? 'active' : 'not-active'}`}>
                    <section className='illustration'>
                      <figure>
                        <img src={relationship} alt='component' />
                      </figure>
                      <label>Relationship</label>
                    </section>
                    <section className='count'>
                      <h2>{this.state.requests.relationship}</h2>
                      <Button variant="secondary" disabled={!this.props.user.proficiency.find(i => i === 'relationship')}>Give Help</Button>
                    </section>
                  </div>
                </Link>
              }


              {this.props.user.proficiency.find(i => i === 'health') &&
                <Link to={'/call?type=health'} >
                  <div className={`component help-component ${this.props.user.proficiency.find(i => i === 'health') ? 'active' : 'not-active'}`}>
                    <section className='illustration'>
                      <figure>
                        <img src={health} alt='component' />
                      </figure>
                      <label>health</label>
                    </section>
                    <section className='count'>
                      <h2>{this.state.requests.health}</h2>
                      <Button variant="secondary" disabled={!this.props.user.proficiency.find(i => i === 'health')}>Give Help</Button>
                    </section>
                  </div>
                </Link>
              }
              {this.props.user.proficiency.find(i => i === 'career') &&
                <Link to={'/call?type=career'} >
                  <div className={`component help-component ${this.props.user.proficiency.find(i => i === 'career') ? 'active' : 'not-active'}`}>
                    <section className='illustration'>
                      <figure>
                        <img src={career} alt='component' />
                      </figure>
                      <label>Career</label>
                    </section>
                    <section className='count'>
                      <h2>{this.state.requests.career}</h2>
                      <Button variant="secondary" disabled={!this.props.user.proficiency.find(i => i === 'career')}>Give Help</Button>
                    </section>
                  </div>
                </Link>
              }
              {this.props.user.proficiency.find(i => i === 'family') &&
                <Link to={'/call?type=family'} >
                  <div className={`component help-component ${this.props.user.proficiency.find(i => i === 'family') ? 'active' : 'not-active'}`}>
                    <section className='illustration'>
                      <figure>
                        <img src={family} alt='component' />
                      </figure>
                      <label>Family</label>
                    </section>
                    <section className='count'>
                      <h2>{this.state.requests.family}</h2>
                      <Button variant="secondary" disabled={!this.props.user.proficiency.find(i => i === 'family')}>Give Help</Button>
                    </section>
                  </div>
                </Link>
              }

              {this.props.user.proficiency.find(i => i === 'interpersonal') &&
                <Link to={'/call?type=interpersonal'} >
                  <div className={`component help-component ${this.props.user.proficiency.find(i => i === 'interpersonal') ? 'active' : 'not-active'}`}>
                    <section className='illustration'>
                      <figure>
                        <img src={interpersonal} alt='component' />
                      </figure>
                      <label>Interpersonal</label>
                    </section>
                    <section className='count'>
                      <h2>{this.state.requests.interpersonal}</h2>
                      <Button variant="secondary" disabled={!this.props.user.proficiency.find(i => i === 'interpersonal')}>Give Help</Button>
                    </section>
                  </div>
                </Link>
              }
              {this.props.user.proficiency.find(i => i === 'parenting') &&
                <Link to={'/call?type=parenting'} >
                  <div className={`component help-component ${this.props.user.proficiency.find(i => i === 'parenting') ? 'active' : 'not-active'}`}>
                    <section className='illustration'>
                      <figure>
                        <img src={parenting} alt='component' />
                      </figure>
                      <label>Parenting</label>
                    </section>
                    <section className='count'>
                      <h2>{this.state.requests.parenting}</h2>
                      <Button variant="secondary" disabled={!this.props.user.proficiency.find(i => i === 'parenting')}>Give Help</Button>
                    </section>
                  </div>
                </Link>
              }

              {this.props.user.proficiency.find(i => i === 'finantial') &&
                <Link to={'/call?type=finantial'} >
                  <div className={`component help-component ${this.props.user.proficiency.find(i => i === 'finantial') ? 'active' : 'not-active'}`}>
                    <section className='illustration'>
                      <figure>
                        <img src={finantial} alt='component' />
                      </figure>
                      <label>Finantial</label>
                    </section>
                    <section className='count'>
                      <h2>{this.state.requests.finantial}</h2>
                      <Button variant="secondary" disabled={!this.props.user.proficiency.find(i => i === 'finantial')}>Give Help</Button>
                    </section>
                  </div>
                </Link>
              }
              {this.props.user.proficiency.find(i => i === 'gender') &&
                <Link to={'/call?type=gender'} >
                  <div className={`component help-component ${this.props.user.proficiency.find(i => i === 'gender') ? 'active' : 'not-active'}`}>
                    <section className='illustration'>
                      <figure>
                        <img src={gender} alt='component' />
                      </figure>
                      <label>Gender</label>
                    </section>
                    <section className='count'>
                      <h2>{this.state.requests.gender}</h2>
                      <Button variant="secondary" disabled={!this.props.user.proficiency.find(i => i === 'gender')}>Give Help</Button>
                    </section>
                  </div>
                </Link>
              }
            </>
          }

        </Zoom>

      </section>
    </div>
  }
}

export default Category;