const initialState = {
  userType: 'client',
  membership: 'no',
  isAuthenticated: false
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
     isAuthenticated : true
   }
 }


 return state
}

export default reducer
