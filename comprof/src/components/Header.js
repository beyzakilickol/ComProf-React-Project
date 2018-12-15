import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/fonts/simple-line-icons.min.css'
import '../assets/css/smoothproducts.css'
import logo from './logo.png'



class Header extends Component{
  constructor(props){
    super(props)

  }


  render(){

    return (

      <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
          <div className="container"><a className="navbar-brand logo" href="#"><a href="/"><img id="logo" src={logo}/></a></a><button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
              <div className="collapse navbar-collapse"
                  id="navcol-1">
                  <ul className="nav navbar-nav ml-auto">
                    <li role="presentation" className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
                    <li role="presentation" className="nav-item"><Link to="/membership" className="nav-link active">Membership</Link></li>
                    <li role="presentation" className="nav-item"><Link to="/search-provider" className="nav-link active">Find Provider</Link></li>
                  </ul>
              </div>
          </div>
      </nav>

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


export default connect(mapStateToProps,mapDispatchToProps)(Header)
