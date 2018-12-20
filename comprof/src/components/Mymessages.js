import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import './styles.css'





class Mymessages extends Component{
  constructor(props){
    super(props)

  }

  render(){

    return (

      <div class="card">
   <div class="card-header">
     Quote
   </div>
   <div class="card-body">
     <blockquote class="blockquote mb-0">
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
       <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
     </blockquote>
   </div>
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

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Mymessages)
