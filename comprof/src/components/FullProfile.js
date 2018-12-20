import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import './fullprofile.css'
import avatar2 from './avatar2.jpg'
import $ from 'jquery';



class FullProfile extends Component{
  constructor(props){
    super(props)
    this.state={
      user: {},
      rating: 0,
      className: 'stars',
      message: ''
    }
  }
  componentDidMount = ()=>{
     axios.post('http://localhost:3001/api/getFullProfile',{
       userid: this.props.fullProfileUserId
     }).then((response)=>{
       this.setState({
         user: response.data
       })
     })
  }
  getRating1 = () =>{
    this.setState({
      ...this.state,
      rating: 1
    })
  }
  getRating2 = () =>{
    this.setState({
      ...this.state,
      rating: 2
    })
  }
  getRating3 = () =>{
    this.setState({
      ...this.state,
      rating: 3
    })
  }
  getRating4 = () =>{
    this.setState({
      ...this.state,
      rating: 4
    })
  }
  getRating5 = () =>{
    this.setState({
      ...this.state,
      rating: 5
    })
  }
  submitRating=()=>{
    axios.post('http://localhost:3001/api/submitRating',{
      rating: this.state.rating,
      userid: this.state.user.userid
    }).then((response)=>{
      this.setState({
        ...this.state,
        className: 'stars hide',
        message: 'Your rating is submitted!'
      })
    })
  }
  sendUsertoRedux=()=>{
    this.props.contactUserId(this.state.user.userid)
    this.props.history.push('/sendmessage')
  }
  render(){
    let norating= ''
    let rating = ''
    if(this.state.user.rating){
      rating = <h3 id="rating" className="text-center">Rating : {this.state.user.rating}</h3>
    } else {
      norating = <h3 id="rating" className="text-center">Rating : No Rating Yet</h3>
    }

    return (

      <div className="profCard fullprof">
      <h1 className="text-center text-white">{this.state.user.expertise}/{this.state.user.subcategory}</h1>
      <h2 id="profName" className="text-center">{this.state.user.fullname}</h2>
      {norating}{rating}
      <div className="profileDivborder"><img className="profile-img" src={avatar2}/></div>

       <div className="profileTextContainer">
       <div className="experience">
       <h3>ACHIEVEMENTS</h3>
       <p className="text-white short-info">{this.state.user.achievement}</p>
      </div>
       <div className="achievements">
       <h3>EXPERIENCE</h3>
       <p className="text-white short-info">{this.state.user.experience}</p>
       </div>
       <div>
       </div>

          </div>
          <p>Rate the proffesional: </p>
  <div className="starContainer">
  <h3 className="text-white">{this.state.message}</h3>
  	<div class={this.state.className}>
  		<input type="radio" name="star" class="star-1" id="star-1" value="1"/>
  		<label onClick={this.getRating1} id="starLabel" for="star-1"><span className="spanStar fa fa-star"></span></label>
  		<input type="radio" name="star" class="star-2" id="star-2" value="2"/>
  		<label onClick={this.getRating2} class="star-2" for="star-2"><span className="spanStar2 fa fa-star"></span></label>
  		<input type="radio" name="star" class="star-3" id="star-3" value="3"/>
  		<label onClick={this.getRating3} class="star-3" for="star-3"><span className="spanStar3 fa fa-star"></span></label>
  		<input type="radio" name="star" class="star-4" id="star-4" value="4"/>
  		<label onClick={this.getRating4} class="star-4" for="star-4"><span className="spanStar4 fa fa-star"></span></label>
  		<input type="radio" name="star" class="star-5" id="star-5" value="5"/>
  		<label onClick={this.getRating5} class="star-5" for="star-5"><span className="spanStar5 fa fa-star"></span></label>
      <button onClick={this.submitRating} id="rateBtn"className="btn btn-warning">Submit</button>

  	</div>
</div>




<button onClick={this.sendUsertoRedux} id="contactBtn" className="btn btn-warning">Contact</button>
      </div>

    )
  }
}


// map global state to local props
const mapStateToProps = (state) => {
  return {
    //ctr: state.counter // this.props.ctr
    fullProfileUserId: state.fullProfileUserId
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter
    contactUserId: (id) => dispatch({type: "CONTACTUSERID", contactuserid: id})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(FullProfile)
