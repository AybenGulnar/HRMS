const adminReducer = (state={isLogged:false,id:0},action)=>{
      switch(action.type){
        case 'LOGIN':
          return {isLogged:true,id:action.id}
        case 'EXIT':
          return {isLogged:false,id:0}
        default:
          return state
      }
}

export default adminReducer