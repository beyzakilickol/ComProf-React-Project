import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import './styles.css'
import profileimage from './profileImage.png'




class AddProfile extends Component{
  constructor(props){
    super(props)
    this.state={
      categories: [],
      subcateg : [],
      fullname: '',
      zipcode: 0,
      image: profileimage,
      expertise: '',
      subcategory: '',
      experience: '',
      achievement: ''

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
    axios.post('http://localhost:3001/api/getprofile',{
      userid: this.props.userid
    }).then((response)=>{

         this.setState({
           ...this.state,
           expertise: response.data.expertise,
           subcategory: response.data.subcategory,
           fullname:response.data.fullname,
           zipcode: response.data.zipcode,
           experience:response.data.experience,
           achievement:response.data.achievement
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
      expertise: e.target.value,
      subcateg : selectedCateg.SubCategories
    })

  }
  getFullName = (e)=>{
    this.setState({
      ...this.state,
      fullname: e.target.value
    })
  }
  getZipcode = (e)=>{
    this.setState({
      ...this.state,
      zipcode: e.target.value
    })
  }
  getSubCat = (e)=>{
    this.setState({
      ...this.state,
      subcategory: e.target.value
    })
  }
  getExperience = (e)=>{
    this.setState({
      ...this.state,
      experience: e.target.value
    })
  }
  getAchievement = (e)=>{
    this.setState({
      ...this.state,
      achievement: e.target.value
    })
  }
  onImageChange = (event) => {
 if (event.target.files && event.target.files[0]) {
   this.setState({
     ...this.state,
     image: URL.createObjectURL(event.target.files[0])
   });
 }
}
sendProfile=()=>{
  axios.post('http://localhost:3001/api/addprofile',{
    userid: this.props.userid,
    fullname: this.state.fullname,
    zipcode: this.state.zipcode,
    image: this.state.image,
    expertise: this.state.expertise,
    subcategory: this.state.subcategory,
    experience: this.state.experience,
    achievement: this.state.achievement
  }).then((response)=>{
    this.props.history.push('/myprofile')
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
     <label>Enter Full Name:</label><input onChange={this.getFullName} type="text" value={this.state.fullname} name="fullname"/>
     <label>Enter Zipcode:</label><input value={this.state.zipcode} onChange={this.getZipcode} type="text" name="zipcode"/>
      <label>Upload an image:</label><input type="file" onChange={this.onImageChange} className="file" id="imageFile"/>
     <label>Your Expertise:</label>

     <select value={this.state.expertise} onChange={this.addSubCategories} id="categorySelectDropdown">
     <option disabled selected >Select an option</option>
      {category}
     </select>
     <label>Select a sub categoy:
     </label>
     <select value={this.state.subcategory} onChange={this.getSubCat}  id="subcategorySelectDropdown">
     <option disabled selected >Select an option</option>
     {subcategory}
     </select>
     <label>Your experience</label><textarea value={this.state.experience} onChange={this.getExperience} placeholder="Type your experience here..." type="text" name="experience"></textarea>
     <label>Your Achievements</label><textarea value={this.state.achievement} onChange={this.getAchievement} placeholder="Type your achievements here..." type="text" name="achievements"></textarea>
     <button onClick={this.sendProfile} className="btn btn-warning profileSubmitBtn">Submit</button>
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


export default connect(mapStateToProps,mapDispatchToProps)(AddProfile)
