import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/fonts/simple-line-icons.min.css'
import '../assets/css/smoothproducts.css'
import logo from './logo.png'



class HomePage extends Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  user = (e) =>{

    this.props.userType(e.target.value)

  }
  render(){

    return (
      <div className="homepageContainer">

      <main className="page landing-page">
          <section className="clean-block clean-hero">
              <div className="text">
                  <h2>Communicate Professionals</h2>
                  <p>A great platform where professionals and clients can get in touch with each other</p><Link to="/login"><button onClick={this.user} className="btn btn-outline-light btn-lg" type="button" value="proffessional">I am a professional</button></Link><Link to="/login"><button onClick={this.user} className="btn btn-outline-light btn-lg" type="button" value="client">I am a client</button></Link></div>
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
    userType: (user) => dispatch({type: "userType", userType: user})

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HomePage)
