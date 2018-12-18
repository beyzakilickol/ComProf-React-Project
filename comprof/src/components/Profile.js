import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import './fullprofile.css'
import avatar2 from './avatar2.jpg'
import profileimage from './profileImage.png'



class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      subcategory:'',
      fullname:'',
      image:profileimage,
      rating:'No rating yet',
      experience:'',
      achievement:'',
      expertise:''
    }
  }
 componentDidMount = () =>{
   axios.post('http://localhost:3001/api/getprofile',{
     userid: this.props.userid
   }).then((response)=>{
     console.log(response.data.image)
        this.setState({
          ...this.state,
          subcategory:response.data.subcategory,
          fullname:response.data.fullname,
          image:this.state.image,
          rating:response.data.rating || this.state.rating,
          experience:response.data.experience,
          achievement:response.data.achievement,
          expertise:response.data.expertise
        })
   })
 }

  render(){

    return (


      <div className="profCard fullprof">
      <h1 className="text-center text-white">{this.state.expertise}/{this.state.subcategory}</h1>
      <h2 id="profName" className="text-center">{this.state.fullname}</h2>
      <h3 id="rating" className="text-center">Rating : {this.state.rating}</h3>
      <div className="profileDivborder"><img className="profile-img" src={this.state.image}/></div>


       <div className="profileTextContainer">
       <div className="experience">
       <h3>MY ACHIEVEMENTS</h3>
       <p >{this.state.achievement}</p>
      </div>
       <div className="achievements">
       <h3>MY EXPERIENCE</h3>
       <p> {this.state.experience}</p>
       </div>
       <div>
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
    userid: state.userid
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile)
