import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import './mymessages.css'


class Mymessages extends Component{
  constructor(props){
    super(props)
    this.state={
     messages: []
   }
  }
  componentDidMount = ()=>{
    axios.post('http://localhost:3001/api/getAllMessages',{
         userid: this.props.userid
    }).then((response)=>{
        this.setState({
          messages: response.data
        })
    })
  }

  getsenderid=(e)=>{
    console.log(e.target.value)
      this.props.contactUserId(e.target.value)
      this.props.history.push('/sendmessage')
  }
  render(){
      let message = this.state.messages.map((each)=>{
        return   <div class="card">
       <div class="card-header">
         {each.messagetitle}
       </div>
       <div class="card-body">
         <blockquote class="blockquote mb-0">
           <p>{each.messagebody}</p>
            <footer class="blockquote-footer">From : {each.sender}<button onClick={this.getsenderid} className='btn btn-warning response' value={each.senderid}>Response</button></footer>
         </blockquote>
       </div>
     </div>
      })
    return (
      <div className="messageContainer">
      {message}
    </div>
    )
  }
}


// map global state to local props
const mapStateToProps = (state) => {
  return {
    //ctr: state.counter // this.props.ctr
userid: state.userid
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter
    contactUserId: (id) => dispatch({type: "CONTACTUSERID", contactuserid: id})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Mymessages)
