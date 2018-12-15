import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import Login from './Login'
import HomePage from './HomePage'
import Membership from './Membership'
import Header from './Header'
import SearchProvider from './SearchProvider'
import MainDashboard from './MainDashboard'



class BaseLayout extends Component{
  constructor(props){
    super(props)
  }

  render(){

    return (

     <div>
     <Header/>
     {this.props.children}
     </div>



    )
  }
}




















export default withRouter(BaseLayout)
