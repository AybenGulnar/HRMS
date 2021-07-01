const ADD = (id,name)=>{
      return{
        type:'ADD',
        id:id,
        name:name
      }
}
    
const DEL = (id)=>{
      return{
        type:'DEL',
        id:id
      }
}

const FavAction = {ADD,DEL}

export default FavAction