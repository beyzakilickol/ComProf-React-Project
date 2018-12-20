let token = localStorage.getItem('jsonwebtoken')

const initialState = {
  membership: 'no',
  token: token? token: '',
  username:'',
  userType: '',
  userid: '',
  usersearchcount: '',
  zipcode: ''
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
       userType: action.user.usertype,
       userid: action.user.userid,
       usersearchcount: action.user.searchcount
     }
  } else if(action.type == "DELETETOKEN"){

       return {
        state:initialState
       }
 }else if(action.type == "UPDATESEARCHCOUNT"){

      return {
        ...state,
       usersearchcount: 1
      }
}else if(action.type == "ZIPCODE"){

     return {
       ...state,
      zipcode: action.zipcode
     }
}
else if(action.type == "FULLPROFILEUSERID"){

     return {
       ...state,
      fullProfileUserId: action.id
     }
}else if(action.type == "CONTACTUSERID"){

     return {
       ...state,
      contactuserid: action.contactuserid
     }
}

 return state
}

export default reducer
