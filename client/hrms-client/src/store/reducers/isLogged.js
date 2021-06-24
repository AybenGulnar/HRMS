const loggedReducer = (state={isLogged:false,isEmployer:false},action)=>{
      switch(action.type){
        case 'SIGN_IN':
          return {isLogged:true,isEmployer:action.isEmployer}
        case 'LOGOUT':
          return {isLogged:false,isEmployer:false}
        default:
          return state
      }
}

export default loggedReducer