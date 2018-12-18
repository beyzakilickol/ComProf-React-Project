import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/fonts/simple-line-icons.min.css'
import '../assets/css/smoothproducts.css'
import logo from './logo.png'
import axios from 'axios'



class SearchProvider extends Component{
  constructor(props){
    super(props)
    this.state={
      inputValue : '',
      message: ''
    }
  }
  checkUser =()=>{
    if(this.state.inputValue==''){
      this.setState({
        ...this.state,
         message: 'Please enter a valid zipcode!'
      })
      return
    }
    let token = localStorage.getItem('jsonwebtoken')
    if(!token){
      this.props.history.push('/login')
    } else {
      axios.post('http://localhost:3001/api/getsearchcount',{
        userid: this.props.userid
      }).then((response)=>{
        if(response.data.searchcount==0){
         this.props.updateSearchCount()
        axios.post('http://localhost:3001/api/searchcount',{
          userid: this.props.userid,
          count: 1
        }).then((response)=>{
              this.props.history.push('/main-dashboard')
        }).catch((error)=>{
          console.log(error)
        })
  } else{
        this.props.history.push('/membership')
  }
      })

    }
  }
  checkInputValue=(e)=>{
    this.props.getZipcode(e.target.value)
    this.setState({
      ...this.state,
       inputValue: e.target.value
    })
  }
  render(){

    return (
      <div className="homepageContainer">

      <main className="page landing-page">
          <section className="clean-block clean-hero">
              <div className="text">
                <h2>Search providers by their zipcodes</h2>
                <input onChange={this.checkInputValue} id="zipcodeSearchBox" type="text" name="zipcode" placeholder="Enter Zipcode"/>
                <button onClick={this.checkUser} className="btn btn-outline-light btn-lg" type="button">SEARCH</button>
                <p>{this.state.message}</p>
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
    userid : state.userid,
    searchcount: state.usersearchcount
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter
  updateSearchCount: () => dispatch({type: "UPDATESEARCHCOUNT"}),
  getZipcode: (zipcode) => dispatch({type:'ZIPCODE',zipcode: zipcode})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchProvider)
