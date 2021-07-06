const loggedReducer = (state={isLogged:false,isEmployer:false,imageUrl:""},action)=>{
      switch(action.type){
        case 'SIGN_IN':
          return {isLogged:true,isEmployer:action.isEmployer,id:action.id,name:action.name,imageUrl:action.imageUrl}
        case 'LOGOUT':
          return {isLogged:false,isEmployer:false,id:0,name:"",imageUrl:""}
        default:
          return state
      }
}

export default loggedReducer