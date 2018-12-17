import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/fonts/simple-line-icons.min.css'
import '../assets/css/smoothproducts.css'
import logo from './logo.png'



class SearchProvider extends Component{
  constructor(props){
    super(props)
  }
  checkUser =()=>{
    let token = localStorage.getItem('jsonwebtoken')
    if(!token){
      this.props.history.push('/login')
    } else {
      this.props.history.push('/main-dashboard')
    }
  }
  render(){

    return (
      <div className="homepageContainer">

      <main className="page landing-page">
          <section className="clean-block clean-hero">
              <div className="text">
                <h2>Search providers by their zipcodes</h2>
                <input id="zipcodeSearchBox" type="text" name="zipcode" placeholder="Enter Zipcode"/>
                <button onClick={this.checkUser} className="btn btn-outline-light btn-lg" type="button">SEARCH</button>
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
    isAuthenticated: state.isAuthenticated
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchProvider)
