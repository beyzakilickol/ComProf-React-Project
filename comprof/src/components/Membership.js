import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import logo from './logo.png'
import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/fonts/simple-line-icons.min.css'
import '../assets/css/smoothproducts.css'
import TakeMoney from './StripeCheckout'
import Checkout from '../Checkout'
import stripelogo from './stripelogo.png'


class Membership extends Component{
  constructor(props){
    super(props)
  }

  render(){

    return (
      <div>
      <main className="page pricing-table-page">
          <section className="clean-block clean-pricing dark">
              <div className="container">
                  <div className="block-heading">
                      <h2 className="text-info">GET A MEMBERSHIP</h2>

                      <p id="membershipText">Make unlimited search for providers closest to you, check their expertise, experience, achievements, customer reviews and CONTACT!</p>
                  </div>
                  <div className="row justify-content-center">
                      <div className="col-md-5 col-lg-4">
                          <div className="clean-pricing-item">
                              <div className="heading">
                                  <h3>BASIC</h3>
                              </div>
                              <p>Offers unlimited provider search to both providers and clients.</p>
                              <div className="features">
                                  <h4><span className="feature">Customer Service:&nbsp;</span><span>Yes</span></h4>
                                  <h4><span className="feature">Profile posting:&nbsp;</span><span>No</span></h4>
                                  <h4><span className="feature">Duration:&nbsp;</span><span>Monthly</span></h4>
                                  <h4><span className="feature">&nbsp;</span><span>Unlimited Search</span></h4>
                              </div>
                              <div className="price">
                                  <h4>$9.99</h4>

                              </div><Checkout name={'COMPROF'} description={'Great platform to meet professionals'} amount = {9.99} image={stripelogo}/></div>
                      </div>
                      <div className="col-md-5 col-lg-4">
                          <div className="clean-pricing-item">
                              <div className="ribbon"><span>Best Value</span></div>
                              <div className="heading">
                                  <h3>PRO</h3>
                              </div>
                              <p>Offers eligibility to release the profile to providers and unlimited search to both providers and clients.</p>
                              <div className="features">
                                  <h4><span className="feature">Customer Service:&nbsp;</span><span>Yes</span></h4>
                                  <h4><span className="feature">Profile posting:&nbsp;</span><span>Yes</span></h4>
                                  <h4><span className="feature">Duration:&nbsp;</span><span>12 Months</span></h4>
                                  <h4><span className="feature">&nbsp;</span><span>Unlimited Search</span></h4>
                              </div>
                              <div className="price">
                                  <h4>$49.99</h4>
                              </div><Checkout /></div>
                      </div>
                      <div className="col-md-5 col-lg-4">
                          <div className="clean-pricing-item">
                              <div className="heading">
                                  <h3>PREMIUM</h3>
                              </div>
                              <p>Offers pro features and eligibilities with no time limitation.</p>
                              <div className="features">
                                  <h4><span className="feature">Customer Service:&nbsp;</span><span>Yes</span></h4>
                                  <h4><span className="feature">Profile posting:&nbsp;</span><span>Yes</span></h4>
                                  <h4><span className="feature">Duration:&nbsp;</span><span>Life Time</span></h4>
                                  <h4><span className="feature">&nbsp;</span><span>Unlimited Search</span></h4>
                              </div>
                              <div className="price">
                                  <h4>$99.99</h4>
                              </div><Checkout/></div>
                      </div>
                  </div>
              </div>
          </section>
      </main>

  </div>

    )
  }
}


// map global state to local props
const mapStateToProps = (state) => {
  return {
    //ctr: state.counter // this.props.ctr
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Membership)
