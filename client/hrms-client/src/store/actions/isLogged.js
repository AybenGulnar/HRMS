const sigin = (isEmployer,id,name,imageUrl)=>{
      return{
        type:'SIGN_IN',
        isEmployer:isEmployer,
        id:id,
        name:name,
        imageUrl:imageUrl
      }
}
    
const logout = ()=>{
      return{
        type:'LOGOUT'
      }
}

const isLogged = {sigin,logout}

export default isLogged