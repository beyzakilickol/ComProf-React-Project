import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import './styles.css'




class AddProfile extends Component{
  constructor(props){
    super(props)
    this.state={
      categories: [],
      subcateg : [],
    }
  }
  componentDidMount = ()=>{
    axios.get('https://api.trademe.co.nz/v1/Categories/Jobs.json').then((categories)=>{
      console.log(categories.data)
      this.setState({
        ...this.state,
        categories : categories.data,
      })
    })
  }
  addSubCategories = (e) =>{
    console.log(e.target.value)
    let selectedCateg = this.state.categories.find((category)=>{
      return category.Name==e.target.value
    })
    this.setState({
      ...this.state,
      subcateg : selectedCateg.SubCategories
    })

  }

  render(){
     let category= this.state.categories.map((category,index)=>{
       return <option key={index} value={category.Name}>{category.Name}</option>
     })
     let subcategory=this.state.subcateg.map((each)=>{
       return <option value={each.Name}>{each.Name}</option>
     })
    return (

     <div id="addProfileDiv">
     <label>Enter Full Name:</label><input type="text" name="fullname"/>
     <label>Enter Zipcode:</label><input type="text" name="zipcode"/>
      <label>Upload an image:</label><input type="file" onChange={this.onImageChange} className="file" id="imageFile"/>
     <label>Your Expertise:</label>

     <select onChange={this.addSubCategories} id="categorySelectDropdown">
     <option disabled selected >Select an option</option>
      {category}
     </select>
     <label>Select a sub categoy:
     </label>
     <select id="subcategorySelectDropdown">
     <option disabled selected >Select an option</option>
     {subcategory}
     </select>
     <label>Your experience</label><textarea placeholder="Type your experience here..." type="text" name="experience"></textarea>
     <label>Your Achievements</label><textarea placeholder="Type your achievements here..." type="text" name="achievements"></textarea>
     <button className="btn btn-warning profileSubmitBtn">Submit</button>
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


export default connect(mapStateToProps,mapDispatchToProps)(AddProfile)
