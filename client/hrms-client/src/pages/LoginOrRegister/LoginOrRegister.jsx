import React,{ useState } from 'react';

//Components
import Login from "../../components/Login/Login"
import Navi from '../../components/Navi/Navi';
import Register from "../../components/Register/Register"

export default function LoginOrRegister() {

  const [togglePage,setTogglePage] = useState(false);

  const changePage = ()=>{
    setTogglePage(prevValue=>!prevValue)
  }

  return(<div>
    <Navi/>
    {togglePage ? <Register change={changePage}/>:<Login change={changePage}/> }
  </div>)
  
}