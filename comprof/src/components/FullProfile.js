import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import './fullprofile.css'
import avatar2 from './avatar2.jpg'



class FullProfile extends Component{
  constructor(props){
    super(props)

  }


  render(){

    return (

      <div className="profCard fullprof">
      <h1 className="text-center text-white">Web Developer</h1>
      <h2 id="profName" className="text-center">John Doe</h2>
      <h3 id="rating" className="text-center">Rating : 4.5</h3>
      <div className="profileDivborder"><img className="profile-img" src={avatar2}/></div>

       <div className="profileTextContainer">
       <div className="experience">
       <h3>MY ACHIEVEMENTS</h3>
       <p className="text-white short-info">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockupsLine 47:   The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a55y/blob/master/docs/rules/anchor-is-valid.md  jsx-a55y/anchor-is-valid
  Line 49:   The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a55y/blob/master/docs/rules/anchor-is-valid.md  jsx-a55y/anchor-is-valid
  Line 50:   The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https:</p>
      </div>
       <div className="achievements">
       <h3>MY EXPERIENCE</h3>
       <p className="text-white short-info">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockupsLine 47:   The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a55y/blob/master/docs/rules/anchor-is-valid.md  jsx-a55y/anchor-is-valid
  Line 49:   The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a55y/blob/master/docs/rules/anchor-is-valid.md  jsx-a55y/anchor-is-valid
  Line 50:   The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https:</p>
       </div>
       <div>
       </div>

          </div>
          <p>Rate the proffesional: </p>
  <div className="starContainer">
  	<div class="stars">
  		<input type="radio" name="star" class="star-1" id="star-1" />
  		<label id="starLabel" for="star-1"><span className="spanStar fa fa-star"></span></label>
  		<input type="radio" name="star" class="star-2" id="star-2" />
  		<label class="star-2" for="star-2"><span className="spanStar2 fa fa-star"></span></label>
  		<input type="radio" name="star" class="star-3" id="star-3" />
  		<label class="star-3" for="star-3"><span className="spanStar3 fa fa-star"></span></label>
  		<input type="radio" name="star" class="star-4" id="star-4" />
  		<label class="star-4" for="star-4"><span className="spanStar4 fa fa-star"></span></label>
  		<input type="radio" name="star" class="star-5" id="star-5" />
  		<label class="star-5" for="star-5"><span className="spanStar5 fa fa-star"></span></label>
      <button id="rateBtn"className="btn btn-warning">Submit</button>

  	</div>
</div>




<button id="contactBtn" className="btn btn-warning">Contact</button>
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


export default connect(mapStateToProps,mapDispatchToProps)(FullProfile)
