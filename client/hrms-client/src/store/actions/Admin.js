const login = (id)=>{
      return{
        type:'LOGIN',
        id:id,
      }
}
    
const exit = ()=>{
      return{
        type:'EXIT'
      }
}

const Admin = {login,exit}

export default Admin