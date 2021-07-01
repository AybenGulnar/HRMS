const sigin = (isEmployer,id,name)=>{
      return{
        type:'SIGN_IN',
        isEmployer:isEmployer,
        id:id,
        name:name
      }
}
    
const logout = ()=>{
      return{
        type:'LOGOUT'
      }
}

const isLogged = {sigin,logout}

export default isLogged