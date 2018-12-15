import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import logo from './logo.png'
import '../login-registration-form-transition/css/style.css'
import '../login-registration-form-transition/css/login.png'

class Login extends Component{
  constructor(props){
    super(props)
  }

  render(){

    return (

     <div>
     <div className="cont">
       <div className="form sign-in">
         <label>
           <span>Email</span>
           <input type="email" />
         </label>
         <label>
           <span>Password</span>
           <input type="password" />
         </label>
         <p className="forgot-pass">Forgot password?</p>
         <button type="button" className="submit">Sign In</button>
         <button type="button" className="fb-btn">Connect with <span>Google Account</span></button>
       </div>
       <div className="sub-cont">
         <div className="img">
           <div className="img__text m--up">
             <h2>New here?</h2>
             <p>Sign up and get in touch with professionals closest to you!</p>
           </div>
           <div className="img__text m--in">
             <h2>One of us?</h2>
             <p>If you already has an account, just sign in. We have missed you!</p>
           </div>
           <div className="img__btn">
             <span className="m--up">Sign Up</span>
             <span className="m--in">Sign In</span>
           </div>
         </div>
         <div className="form sign-up">
           <label>
             <span>Name</span>
             <input type="text" />
           </label>
           <label>
             <span>Email</span>
             <input type="email" />
           </label>
           <label>
             <span>Password</span>
             <input type="password" />
           </label>
           <button type="button" className="submit">Sign Up</button>
           <button type="button" className="fb-btn">Join with <span>Google Account</span></button>
         </div>
       </div>
     </div>

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


export default connect(mapStateToProps,mapDispatchToProps)(Login)
