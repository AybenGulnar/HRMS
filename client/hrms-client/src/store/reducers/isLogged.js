const loggedReducer = (state={isLogged:false,isEmployer:false},action)=>{
      switch(action.type){
        case 'SIGN_IN':
          return {isLogged:true,isEmployer:action.isEmployer,id:action.id,name:action.name}
        case 'LOGOUT':
          return {isLogged:false,isEmployer:false,id:0,name:""}
        default:
          return state
      }
}

export default loggedReducer