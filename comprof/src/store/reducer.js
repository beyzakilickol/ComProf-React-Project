let token = localStorage.getItem('jsonwebtoken')

const initialState = {
  membership: 'no',
  token: token? token: '',
  username:'',
  userType: ''
}

const reducer = (state = initialState, action) => {

 if(action.type == "userType") {
   return {
     ...state,
     userType : action.userType
   }
 } else if(action.type == "AUTHENTICATED"){
   return {
     ...state,
     token : action.token}
   } else if(action.type == "USER"){
     console.log(action.user.usertype)
     return {
       ...state,
       username : action.user.username,
       userType: action.user.usertype
     }
 }


 return state
}

export default reducer
