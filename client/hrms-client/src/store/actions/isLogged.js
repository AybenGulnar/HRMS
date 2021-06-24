const sigin = (isEmployer)=>{
      return{
        type:'SIGN_IN',
        isEmployer:isEmployer
      }
}
    
const logout = ()=>{
      return{
        type:'LOGOUT'
      }
}

const isLogged = {sigin,logout}

export default isLogged