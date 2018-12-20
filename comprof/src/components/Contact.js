import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import './styles.css'





class Contact extends Component{
  constructor(props){
    super(props)
    this.state={
title: '',
body: ''

    }
  }
  sendmessage = ()=>{

    axios.post('http://localhost:3001/api/sendmessage',{
      senderusername: this.props.username,
      contactuserid: this.props.contactuserid,
      messagetitle: this.state.title,
      messagebody: this.state.body
    }).then((response)=>{

    console.log(response.data)
    this.props.history.push('/main-dashboard')
    })
  }
 getTitle= (e)=>{
   this.setState({
     ...this.state,
     title: e.target.value
   })
 }
 getbody= (e)=>{
   this.setState({
     ...this.state,
     body: e.target.value
   })
 }
  render(){

    return (

     <div id="addProfileDiv">
     <label>Enter message title</label><input onChange={this.getTitle} type="text" name="title"/>

     <label>Your Message</label><textarea onChange={this.getbody} placeholder="Type your message here..." type="text" name="messagebody"></textarea>

     <button onClick={this.sendmessage} className="btn btn-warning profileSubmitBtn">Submit</button>
     </div>

    )
  }
}


// map global state to local props
const mapStateToProps = (state) => {
  return {
    //ctr: state.counter // this.props.ctr
    contactuserid: state.contactuserid,
    username: state.username
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Contact)
