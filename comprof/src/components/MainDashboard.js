import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import './styles.css'
import avatar2 from './avatar2.jpg'
import $ from 'jquery';


class MainDashboard extends Component{
  constructor(props){
    super(props)
    this.state={
    profiles:[],
    rating: 'No rating yet'
    }

  }

  componentDidMount = ()=>{

    axios.post('http://localhost:3001/api/getAllProfile',{
      zipcode: this.props.zipcode
    }).then((response)=>{
      console.log(response.data)

      this.setState({
        profiles: response.data
      })
    })

    $( document ).ready(function() {

    $('#cssmenu > ul > li > a').click(function() {
        console.log($(this).children().html().replace("&amp;", "&"))
        console.log($(this).closest('li').find('ul').children())
        console.log($('#zipcode').html())
        $(this).closest('li').find('ul').children().click(function(){
          axios.post('http://localhost:3001/api/expertise',{
            expertise: $(this).parentsUntil('.has-sub').parent().find('.expertise').html().replace("&amp;", "&"),
            subcategory: $(this).children().children().html().replace("&amp;", "&"),
            zipcode: $('#zipcode').html()
          }).then(function(response){
            console.log(response.data)
               let profs = response.data.map((each)=>{

                 if(each.rating){
                 return ` <div class="profCard2">
                   <div class="profileDivborder2"><img class="profile-img2" src=${avatar2}/></div>
                    <h2 class="text-center text-white">${each.expertise}/${each.subcategory}</h2>
                    <h5 >${each.fullname}</h5>
                    <p class="text-white short-info">${each.experience}</p>
                    <footer>
                    <p>Rating: ${each.rating}</p>
                    <input class="more" type="hidden" value="${each.userid}"/>
                    <button class="moreBtn btn btn-warning" >More...</button>
                    </footer>
                   </div>`
                 } else {
                     return ` <div class="profCard2">
                       <div class="profileDivborder2"><img class="profile-img2" src=${avatar2}/></div>
                        <h2 class="text-center text-white">${each.expertise}/${each.subcategory}</h2>
                        <h5 >${each.fullname}</h5>
                        <p class="text-white short-info">${each.experience}</p>
                        <footer>
                        <p>Rating: No rating yet</p>
                        <input class="more" type="hidden" value="${each.userid}"/>
                        <button class="moreBtn btn btn-warning" >More...</button>
                        </footer>
                       </div>`
                   }
               })

               $('.professionalsContainer2').html(profs)
          })
              console.log($(this).children().children().html().replace("&amp;", "&"))
        console.log($(this).parentsUntil('.has-sub').parent().find('.expertise').html().replace("&amp;", "&"))
        })

      $('#cssmenu li').removeClass('active');
      $(this).closest('li').addClass('active');
      var checkElement = $(this).next();
      if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
        $(this).closest('li').removeClass('active');
        checkElement.slideUp('normal');
      }
      if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
        $('#cssmenu ul ul:visible').slideUp('normal');
        checkElement.slideDown('normal');
      }
      if($(this).closest('li').find('ul').children().length == 0) {
        return true;
      } else {
        return false;
      }

    });

    });

}
fullProfile = (e)=>{
  console.log(e.target.value)
   this.props.fullProfileUserId(e.target.value)

}
getValue=(e)=>{
  console.log(e.target.value)
}
  render(){
    let profile = this.state.profiles.map((each)=>{
      if(each.rating){
      return   <div className="profCard2">
        <div className="profileDivborder2"><img className="profile-img2" src={avatar2}/></div>
         <h2 className="text-center text-white">{each.expertise}/{each.subcategory}</h2>
         <h5 >{each.fullname}</h5>
         <p className="text-white short-info">{each.experience}</p>
         <footer>
         <p>Rating: {each.rating}</p>

         <a href="/full-profile"><button onClick={this.fullProfile} value={each.userid} className="btn btn-warning">More...</button></a>
         </footer>
        </div>
    } else {
    return   <div className="profCard2">
      <div className="profileDivborder2"><img className="profile-img2" src={avatar2}/></div>
       <h2 className="text-center text-white">{each.expertise}/{each.subcategory}</h2>
       <h5 >{each.fullname}</h5>
       <p className="text-white short-info">{each.experience}</p>
       <footer>
       <p>Rating: {this.state.rating}</p>

        <a href="/full-profile"><button onClick={this.fullProfile} value={each.userid} className="btn btn-warning">More...</button></a>
       </footer>
      </div>
    }
    })
    return (
      <div className="dashboardContainer">
      <div id='cssmenu'>
      <ul>
         <li className='active'><a href='#'><span id="zipcode">{this.props.zipcode}</span></a></li>
         <li className='has-sub'><a href='#'><span className="expertise" >Accounting</span></a>
            <ul>
               <li><a href='#'><span>Accountants</span></a></li>
               <li><a href='#'><span>Accounts administrators</span></a></li>
               <li><a href='#'><span>Finance managers &#38; controllers</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li className='last'><a href='#'><span>Payroll</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Agriculture, fishing & forestry</span></a>
            <ul>
               <li><a href='#'><span>Farming</span></a></li>
               <li><a href='#'><span>Fishing</span></a></li>
               <li><a href='#'><span>Forestry</span></a></li>
               <li><a href='#'><span>Horticulture</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Architecture</span></a>
            <ul>
               <li><a href='#'><span>Architects</span></a></li>
               <li><a href='#'><span>Drafting</span></a></li>
               <li><a href='#'><span>Interior design</span></a></li>

               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Automotive</span></a>
            <ul>
               <li><a href='#'><span>Automotive technician</span></a></li>
               <li><a href='#'><span>Diesel mechanic</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li><a href='#'><span>Panel & paint</span></a></li>
               <li><a href='#'><span>Sales, operations & parts</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Banking, finance & insurance</span></a>
            <ul>
               <li><a href='#'><span>Analysts</span></a></li>
               <li><a href='#'><span>Client services</span></a></li>
               <li><a href='#'><span>Corporate & institutional banking</span></a></li>
               <li><a href='#'><span>Credit & lending</span></a></li>
               <li><a href='#'><span>Financial planning & investment</span></a></li>
               <li><a href='#'><span>Insurance</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li><a href='#'><span>Risk & compliance</span></a></li>
               <li><a href='#'><span>Settlements</span></a></li>
               <li><a href='#'><span>Tellers & branch staff</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Construction & roading</span></a>
            <ul>
               <li><a href='#'><span>Estimation</span></a></li>
               <li><a href='#'><span>Health & safety</span></a></li>
               <li><a href='#'><span>Labouring</span></a></li>
               <li><a href='#'><span>Machine operators</span></a></li>
               <li><a href='#'><span>Planning</span></a></li>
               <li><a href='#'><span>Traffic management</span></a></li>
               <li><a href='#'><span>Site management</span></a></li>
               <li><a href='#'><span>Project & contracts management</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Customer service</span></a>
            <ul>
               <li><a href='#'><span>Call centre</span></a></li>
               <li><a href='#'><span>Customer-facing</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Education</span></a>
            <ul>
            <li><a href='#'><span>Teacher</span></a></li>
            <li><a href='#'><span>Admin</span></a></li>
               <li><a href='#'><span>Au pairs & nannies</span></a></li>
               <li><a href='#'><span>Early childhood</span></a></li>
               <li><a href='#'><span>Primary</span></a></li>
               <li><a href='#'><span>Secondary</span></a></li>
               <li><a href='#'><span>Tertiary</span></a></li>
               <li><a href='#'><span>Tutoring & training</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Engineering</span></a>
            <ul>
               <li><a href='#'><span>Geotechnical</span></a></li>
               <li><a href='#'><span>Building services</span></a></li>
               <li><a href='#'><span>Civil & structural</span></a></li>
               <li><a href='#'><span>Drafting</span></a></li>
               <li><a href='#'><span>Electrical</span></a></li>
               <li><a href='#'><span>Energy</span></a></li>
               <li><a href='#'><span>Environmental</span></a></li>
               <li><a href='#'><span>Industrial</span></a></li>
               <li><a href='#'><span>Maintenance</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li><a href='#'><span>Mechanical</span></a></li>
               <li><a href='#'><span>Project management</span></a></li>
               <li><a href='#'><span>Water & waste</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Healthcare</span></a>
            <ul>
               <li><a href='#'><span>Administration</span></a></li>
               <li><a href='#'><span>Caregiving</span></a></li>
               <li><a href='#'><span>Community & social services</span></a></li>
               <li><a href='#'><span>Dentistry</span></a></li>
               <li><a href='#'><span>Doctors & specialists</span></a></li>
               <li><a href='#'><span>Fitness & wellbeing</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li><a href='#'><span>Nursing & midwifery</span></a></li>
               <li><a href='#'><span>Occupational therapy</span></a></li>
               <li><a href='#'><span>Pharmacy</span></a></li>
               <li><a href='#'><span>Physiotherapy</span></a></li>
               <li><a href='#'><span>Radiography & sonography</span></a></li>
               <li><a href='#'><span>Veterinary</span></a></li>

               <li><a href='#'><span>Psychology & counselling</span></a></li>

               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Hospitality & tourism</span></a>
            <ul>
               <li><a href='#'><span>Bar staff & baristas</span></a></li>
               <li><a href='#'><span>Chefs</span></a></li>
               <li><a href='#'><span>Housekeeping</span></a></li>
               <li><a href='#'><span>Kitchen staff</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li><a href='#'><span>Reception & front desk</span></a></li>
               <li><a href='#'><span>Tourism & tour guides</span></a></li>
               <li><a href='#'><span>Travel consultants</span></a></li>
               <li><a href='#'><span>Waiting Staff</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">HR & recruitment</span></a>
            <ul>
               <li><a href='#'><span>Health & safety</span></a></li>
               <li><a href='#'><span>HR</span></a></li>
               <li><a href='#'><span>Recruitment</span></a></li>

               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">IT</span></a>
            <ul>
               <li><a href='#'><span>Architects</span></a></li>
               <li><a href='#'><span>Business & systems analysts</span></a></li>
               <li><a href='#'><span>Data warehousing & BI</span></a></li>
               <li><a href='#'><span>Database</span></a></li>
               <li><a href='#'><span>Functional consultants</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li><a href='#'><span>Networking & storage</span></a></li>
               <li><a href='#'><span>Programming & development</span></a></li>
               <li><a href='#'><span>Project management</span></a></li>
               <li><a href='#'><span>Sales & pre-sales</span></a></li>
               <li><a href='#'><span>Security</span></a></li>
               <li><a href='#'><span>Service Desk</span></a></li>
               <li><a href='#'><span>Systems engineers</span></a></li>
               <li><a href='#'><span>Telecommunications</span></a></li>
               <li><a href='#'><span>Testing</span></a></li>
               <li><a href='#'><span>Training</span></a></li>
               <li><a href='#'><span>Web Design</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Manufacturing & operations</span></a>
            <ul>
               <li><a href='#'><span>Fitters & machining</span></a></li>
               <li><a href='#'><span>Machine Operation</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li><a href='#'><span>Process & assembly</span></a></li>
               <li><a href='#'><span>Purchasing & inventory</span></a></li>
               <li><a href='#'><span>Quality assurance</span></a></li>
               <li><a href='#'><span>Storepersons & warehousing</span></a></li>
               <li><a href='#'><span>Supervisors & forepersons</span></a></li>

               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Marketing, media & communications</span></a>
            <ul>
               <li><a href='#'><span>Advertising</span></a></li>
               <li><a href='#'><span>Brand & product management</span></a></li>
               <li><a href='#'><span>Communications & PR</span></a></li>
               <li><a href='#'><span>Design</span></a></li>
               <li><a href='#'><span>Digital Marketing</span></a></li>
               <li><a href='#'><span>Direct marketing</span></a></li>
               <li><a href='#'><span>Journalism</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li><a href='#'><span>Market research & analysis</span></a></li>
               <li><a href='#'><span>Marketing assistants & coordinators</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Office & administration</span></a>
            <ul>
               <li><a href='#'><span>Administration</span></a></li>
               <li><a href='#'><span>Data Entry</span></a></li>
               <li><a href='#'><span>EA, PA & secretarial</span></a></li>
               <li><a href='#'><span>Office management</span></a></li>
               <li><a href='#'><span>Reception</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Property</span></a>
            <ul>
               <li><a href='#'><span>Commercial sales & leasing</span></a></li>
                <li><a href='#'><span>Consultancy & valuation</span></a></li>
                 <li><a href='#'><span>Facilities & commercial property management</span></a></li>
                  <li><a href='#'><span>Residential sales & management</span></a></li>

               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Retail</span></a>
            <ul>
               <li><a href='#'><span>Area Manager</span></a></li>
               <li><a href='#'><span>Buying</span></a></li>
               <li><a href='#'><span>Department managers</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li><a href='#'><span>Merchandising</span></a></li>
               <li><a href='#'><span>Retail assistants</span></a></li>
               <li><a href='#'><span>Store managers</span></a></li>
               <li><a href='#'><span>Assistant store managers</span></a></li>

               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Sales</span></a>
            <ul>
               <li><a href='#'><span>Account management</span></a></li>
               <li><a href='#'><span>Business development manager</span></a></li>
               <li><a href='#'><span>Sales managers</span></a></li>
               <li><a href='#'><span>Sales reps</span></a></li>
               <li><a href='#'><span>Sales support</span></a></li>
               <li><a href='#'><span>Telesales</span></a></li>

               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Science & technology</span></a>

         </li>
         <li className='has-sub'><a href='#'><span className="expertise" onClick={this.getValue}>Trades & services</span></a>
            <ul>
               <li><a href='#'><span>Air con. & refrigeration</span></a></li>
               <li><a href='#'><span>Beautician</span></a></li>
               <li><a href='#'><span>Boat building</span></a></li>
               <li><a href='#'><span>Boilermakers & welders</span></a></li>
               <li><a href='#'><span>Building & carpentry</span></a></li>
               <li><a href='#'><span>Butchers & bakers</span></a></li>
               <li><a href='#'><span>Cleaning</span></a></li>
               <li><a href='#'><span>Electrical</span></a></li>
               <li><a href='#'><span>Flooring</span></a></li>
               <li><a href='#'><span>Gardening & landscaping</span></a></li>
               <li><a href='#'><span>Glaziers</span></a></li>
               <li><a href='#'><span>Hairdressing</span></a></li>
               <li><a href='#'><span>Handy-persons</span></a></li>
               <li><a href='#'><span>Labourers</span></a></li>
               <li><a href='#'><span>Painting</span></a></li>
               <li><a href='#'><span>Plumbing</span></a></li>
               <li><a href='#'><span>Printing</span></a></li>
               <li><a href='#'><span>Roofing</span></a></li>
               <li><a href='#'><span>Security</span></a></li>
               <li><a href='#'><span>Sing Writers</span></a></li>
               <li><a href='#'><span>Technicians</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span className="expertise">Transport & logistics</span></a>
            <ul>
               <li><a href='#'><span>Drivers & couriers</span></a></li>
               <li><a href='#'><span>Freight forwarders</span></a></li>
               <li><a href='#'><span>Import & export</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li><a href='#'><span>Operations</span></a></li>
               <li><a href='#'><span>Supply chain & planning</span></a></li>
               <li><a href='#'><span>Warehouse & distribution</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
          <li className=''><a href='#'><span></span></a></li>
          <li className=''><a href='#'><span></span></a></li>
          <li className=''><a href='#'><span></span></a></li>
          <li className=''><a href='#'><span></span></a></li>
      </ul>
      </div>
      <div className="professionalsContainer2">
      {profile}

</div>


      </div>
    )
  }
}


// map global state to local props
const mapStateToProps = (state) => {
  return {
    //ctr: state.counter // this.props.ctr
    zipcode: state.zipcode
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    // this.props.onIncrementCounter
fullProfileUserId: (id) => dispatch({type: "FULLPROFILEUSERID", id: id})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(MainDashboard)
