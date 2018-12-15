import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import './styles.css'

class MainDashboard extends Component{
  constructor(props){
    super(props)
    this.state={
      categories: [],

    }
  }
  componentDidMount = ()=>{
    axios.get('https://api.trademe.co.nz/v1/Categories/Jobs.json').then((categories)=>{
      console.log(categories.data)
      let subCat = categories.data.map((data)=>{
        return data.SubCategories
      })

      this.setState({
        ...this.state,
        categories : categories.data,


      })
    })
  }
  render(){

    return (
      <div className="dashboardContainer">
      <div id='cssmenu'>
      <ul>
         <li className='active'><a href='#'><span>By ZipCode</span></a></li>
         <li className='has-sub'><a href='#'><span>Accounting</span></a>
            <ul>
               <li><a href='#'><span>Accountants</span></a></li>
               <li><a href='#'><span>Accounts administrators</span></a></li>
               <li><a href='#'><span>Finance managers & controllers</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li className='last'><a href='#'><span>Payroll</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>Agriculture, fishing & forestry</span></a>
            <ul>
               <li><a href='#'><span>Farming</span></a></li>
               <li><a href='#'><span>Fishing</span></a></li>
               <li><a href='#'><span>Forestry</span></a></li>
               <li><a href='#'><span>Horticulture</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>Architecture</span></a>
            <ul>
               <li><a href='#'><span>Architects</span></a></li>
               <li><a href='#'><span>Drafting</span></a></li>
               <li><a href='#'><span>Interior design</span></a></li>

               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>Automotive</span></a>
            <ul>
               <li><a href='#'><span>Automotive technician</span></a></li>
               <li><a href='#'><span>Diesel mechanic</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li><a href='#'><span>Panel & paint</span></a></li>
               <li><a href='#'><span>Sales, operations & parts</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>Banking, finance & insurance</span></a>
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
         <li className='has-sub'><a href='#'><span>Construction & roading</span></a>
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
         <li className='has-sub'><a href='#'><span>Customer service</span></a>
            <ul>
               <li><a href='#'><span>Call centre</span></a></li>
               <li><a href='#'><span>Customer-facing</span></a></li>
               <li><a href='#'><span>Management</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>Education</span></a>
            <ul>
               <li><a href='#'><span>Au pairs & nannies</span></a></li>
               <li><a href='#'><span>Early childhood</span></a></li>
               <li><a href='#'><span>Primary</span></a></li>
               <li><a href='#'><span>Secondary</span></a></li>
               <li><a href='#'><span>Tertiary</span></a></li>
               <li><a href='#'><span>Tutoring & training</span></a></li>
               <li className='last'><a href='#'><span>Other</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>
         <li className='has-sub'><a href='#'><span>About</span></a>
            <ul>
               <li><a href='#'><span>Company</span></a></li>
               <li className='last'><a href='#'><span>Contact</span></a></li>
            </ul>
         </li>

         <li className='last'><a href='#'><span>Contact</span></a></li>
      </ul>
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


export default connect(mapStateToProps,mapDispatchToProps)(MainDashboard)
