import React from "react"
import {Switch, Route} from "react-router-dom"


//pages
import Main from "./pages/Main/Main"
import LoginOrRegister from "./pages/LoginOrRegister/LoginOrRegister"
import Profil from "./pages/Profil/Profil"
import AdminPanel from "./pages/AdminPanel/AdminPanel"
import PanelLogin from "./pages/PanelLogin/PanelLogin"


const App = ()=> {
  return (
    <Switch>

    <Route path="/" exact>
      <Main/>
    </Route>

    <Route path="/auth">
      <LoginOrRegister/>
    </Route>

    <Route path="/profil/:id">
      <Profil/>
    </Route>
    
    <Route path="/admin/login">
      <PanelLogin/>
    </Route>  

    <Route path="/admin">
      <AdminPanel/>
    </Route>

    
    
  </Switch>
  );
}

export default App;
