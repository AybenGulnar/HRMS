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
import JobSeeker from "./pages/JobSeeker/JobSeeker"
import Employer from "./pages/Employer/Employer"
import JobSeekerLogin from "./pages/JobSeeker/JobSeekerLogin"
import JobSeekerRegister from "./pages/JobSeeker/JobSeekerRegister"
import EmployerLogin from "./pages/Employer/EmployerLogin"
import EmployerRegister from "./pages/Employer/EmployerRegister"
import JobSeekerSettings from "./pages/JobSeeker/JobSeekerSettings"
import EmployerSettings from "./pages/Employer/EmployerSettings"
import JobAdvert from "./pages/Employer/JobAdvert"
import PanelLogin from "./pages/Admin/PanelLogin"


const App = ()=> {
  return (
    <Switch>
      
      <Route path="/panel/login">
        <PanelLogin/>
      </Route>

      <Route path="/panel/">
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
              <JobSeekerLogin/>
            </Route>

            <Route path="/aday/uyeol">
              <JobSeekerRegister/>
            </Route>

            <Route path="/aday/ayarlar">
              <JobSeekerSettings/>
            </Route>

            <Route path="/aday/:id">
              <JobSeeker/>
            </Route>

            <Route path="/firma/giris">
              <EmployerLogin/>
            </Route>

            <Route path="/firma/uyeol">
              <EmployerRegister/>
            </Route>

            <Route path="/firma/ayarlar">
              <EmployerSettings/>
            </Route>

            <Route path="/firma/ilanlarım">
              <JobAdvert/>
            </Route>

            <Route path="/firma/:id">
              <Employer/>
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
