import React from "react"
import {Switch, Route} from "react-router-dom"


//Components
import Navi from "./Components/Navi"
import Footer from "./Components/Footer"

//pages
import Home from "./pages/Home"
import Jobs from "./pages/Jobs"
import Job from "./pages/Job"
import Panel from "./pages/Admin/Panel"


const App = ()=> {
  return (
    <Switch>

      <Route path="/panel">
        <Panel/>
      </Route>

      <Route path="/">
        <Navi/>
        <Switch>
            <Route path="/" exact>
              <Home/>
            </Route>

            <Route path="/is-ilanlari" exact>
              <Jobs/>
            </Route>

            <Route path="/is-ilanlari/:id">
              <Job/>
            </Route>

            <Route path="/aday/giris" exact>

            </Route>

            <Route path="/aday/uyeol">

            </Route>

            <Route path="/aday/ayarlar">

            </Route>

            <Route path="/aday/:id">

            </Route>

            <Route path="/firma/giris">

            </Route>

            <Route path="/firma/uyeol">

            </Route>

            <Route path="/firma/ayarlar">

            </Route>

            <Route path="/firma/:id">

            </Route>

            <Route path="/:id">
              404 Page not Found
            </Route>
        </Switch>
        <Footer/>
      </Route>
    </Switch>
  );
}

export default App;
