import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/fonts/simple-line-icons.min.css'
import '../assets/css/smoothproducts.css'
import logo from './logo.png'
import history from '../history';



class Header extends Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  componentDidMount = () => {

  }
  logout = ()=>{
    localStorage.clear()
    this.props.deleteToken()
    history.push('/login')
  }
  render(){

    let proffesionalLink = ''
    let proffesionalLink2 = ''

    if(this.props.userType == "proffessional") {
      proffesionalLink = <Link to='/myprofile' className='dropdown-item' >My Profile</Link>
      proffesionalLink2 = <a href='/add-profile' className='dropdown-item' > Edit Profile</a>
    }

    if(!this.props.token==''){
    return (

      <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
          <div className="container"><Link to="/" className="navbar-brand logo" ><img id="logo" src={logo}/></Link><button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
              <div className="collapse navbar-collapse"
                  id="navcol-1">
                  <ul className="nav navbar-nav ml-auto">
                    <li role="presentation" className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
                    <li role="presentation" className="nav-item"><Link to="/membership" className="nav-link active">Membership</Link></li>
                    <li role="presentation" className="nav-item"><Link to="/search-provider" className="nav-link active">Find Provider</Link></li>


                  </ul>

              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle userButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.props.username}
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">My messages</a>
                  {proffesionalLink}{proffesionalLink2}
                  <div className="dropdown-divider"></div>
                  <button onClick={this.logout} className="dropdown-item" >Logout</button>
                </div>
              </div>
          </div>
      </nav>

    )
  } else {

    return (
      <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
          <div className="container"><a className="navbar-brand logo" href="#"><a href="/"><img id="logo" src={logo}/></a></a><button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
              <div className="collapse navbar-collapse"
                  id="navcol-1">
                  <ul className="nav navbar-nav ml-auto">
                    <li role="presentation" className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
                    <li role="presentation" className="nav-item"><Link to="/membership" className="nav-link active">Membership</Link></li>



                  </ul>

              </div>
          </div>
      </nav>
     )
  }
}
}


// map global state to local props
const mapStateToProps = (state) => {
  return {
    //ctr: state.counter // this.props.ctr
    token : state.token,
    username : state.username,
    userType : state.userType
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter
    deleteToken : () => dispatch({type: "DELETETOKEN"})

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Header)
