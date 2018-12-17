import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import logo from './logo.png'
import '../login-registration-form-transition/css/style.css'
import '../login-registration-form-transition/css/login.png'
import axios from 'axios'
import { setAuthenticationToken } from '../utils'


class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      username: '',
      email:'',
      password :'',
      message :'',
      pageType: 'cont',
      loginMessage: ''
    }
  }
  getUsername=(e)=>{
    this.setState({
      ...this.state,
      username: e.target.value
    })
  }
  getEmail=(e)=>{
    this.setState({
      ...this.state,
      email: e.target.value

    })
  }
  getPassword=(e)=>{
    this.setState({
      ...this.state,
      password: e.target.value
    })
  }
  sendUserToServer= ()=>{
  let username = this.state.username
  let email = this.state.email
  let password = this.state.password
  let membership = this.props.membership
  let userType = this.props.userType
 axios.post('http://localhost:3001/api/register',{
   username : username,
   email: email,
   password: password,
   membership: membership,
   userType: userType
 }).then((response)=>{

   if(response.data.success == true){
    this.setState({
      ...this.state,
      message: '',
      pageType: 'cont'
    })

  } else{
    this.setState({
      ...this.state,
      message : response.data
    })
  }
  console.log(response.data)
})
}
changePage = () =>{
  if(this.state.pageType == 'cont'){
  this.setState({
    ...this.state,
    pageType : 'cont s--signup'
  })
} else {
  this.setState({
    ...this.state,
    pageType : 'cont'
  })
}
}
loginGetEmail=(e)=>{
  this.setState({
    ...this.state,
    email: e.target.value
  })
}
loginGetPassword=(e)=>{
  this.setState({
    ...this.state,
    password: e.target.value
  })
}
loginSendServer=()=>{
  let email = this.state.email
  let password = this.state.password

 axios.post('http://localhost:3001/api/login',{
   email: email,
   password: password,

 }).then((response)=>{
   if(response.data == 'The email you entered is invalid!'){

         this.setState({
           ...this.state,
           loginMessage: response.data
         })

       } else if(response.data == 'The password you entered is incorrect!'){

         this.setState({
           ...this.state,
           loginMessage : response.data
         })
       }  else {
         this.props.user(response.data.user)
         this.props.authenticate(response.data.token)
         localStorage.setItem('jsonwebtoken',response.data.token)

       // put the token in the request header
      setAuthenticationToken(response.data.token)

        this.props.history.push('/search-provider')

       }


     }).catch((error)=>{

       console.log(error)
     })
    }
  render(){

    return (

     <div>
     <div className={this.state.pageType}>
       <div className="form sign-in">
         <label>
           <span>Email</span>
           <input onChange={this.loginGetEmail} type="email" />
         </label>
         <label>
           <span>Password</span>
           <input onChange={this.loginGetPassword} type="password" />
         </label>
         <p className="forgot-pass">Forgot password?</p>
         <button onClick={this.loginSendServer} type="button" className="submit">Sign In</button>
         <button type="button" className="fb-btn">Connect with <span>Google Account</span></button>
         <p>{this.state.loginMessage}</p>
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
           <div onClick = {this.changePage} className="img__btn">
             <span className="m--up">Sign Up</span>
             <span className="m--in">Sign In</span>
           </div>
         </div>
         <div className="form sign-up">
           <label>
             <span>Username</span>
             <input type="text" onChange={this.getUsername}/>
           </label>
           <label>
             <span>Email</span>
             <input type="email" onChange={this.getEmail}/>
           </label>
           <label>
             <span>Password</span>
             <input type="password" onChange={this.getPassword}/>
           </label>
           <button onClick={this.sendUserToServer} type="button" className="submit">Sign Up</button>
           <button type="button" className="fb-btn">Join with <span>Google Account</span></button>
           <p>{this.state.message}</p>
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
    membership: state.membership,
    userType: state.userType
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter
    authenticate: (token) => dispatch({type: "AUTHENTICATED", token: token}),
    user: (user) => dispatch({type: "USER", user: user})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)
