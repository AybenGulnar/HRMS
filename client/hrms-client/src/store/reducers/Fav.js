const favReducer = (state=[{id:1,name:"React Dev"}],action)=>{
      switch(action.type){
        case 'ADD':
          return [...state,{id:action.id,name:action.name}]
        case 'DEL':
          return state.filter(item=>item.id !== action.id)
        default:
          return state
      }
}

export default favReducer