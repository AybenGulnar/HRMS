import React, { useEffect, useState } from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import Cookies from 'js-cookie'
import { Container,Row,Col,Form,Button } from "react-bootstrap"


//style
import style from "./PanelLogin.module.css"

const url = "http://localhost:4000/api/"

const LoginPage = ()=>{


      const [user,setUser] = useState({name:"",pass:""})
      const [auth,setAuth] = useState(false)
      const [text,setText] = useState("Welcome")

      useEffect(()=>{
            let token = Cookies.get("token")
            
            axios.post((url+"user/auth"),{token:token}).then(
                  res =>{
                        if(res.data.auth){
                              setAuth(true)
                        }
                  }
             )
      },[])

      const handleUser = (e)=>{

            const {name,value} = e.target
            setUser(prevValue=>{
                  if(name === "name"){
                        return({...prevValue,name:value})
                  }
                  else if(name === "pass"){
                        return({...prevValue,pass:value})
                  }
            })
      }

      const Login = (e)=>{
            e.preventDefault()
            axios.post((url+"user/token"),user).then(
                  res =>{
                        if(res.data.auth){
                              Cookies.set("token",res.data.token, { expires: 1/24/30 })
                              setTimeout(()=>{setAuth(true)},500)
                        }
                        else{
                              setText("User not found")
                              setTimeout(()=>{setText("Welcome")},1000)
                        }
                  }
            )
            setUser({name:"",pass:""})
      }

      return(
      <div className={style.login}>
            {auth && <Redirect to="/panel" />}
            <Container>
                  <Row className="justify-content-center">
                        <Col md={6} lg={4}>
                              <div className={style.login_wrap + " py-5"}>
                                    <div className={style.img +" d-flex align-items-center justify-content-center"}></div>
                                    <h3 className="text-center mb-0">{text}</h3>
                                    <p className="text-center">Sign in by entering the information below</p>
                                    <Form className={style.login_form} onSubmit={Login}>
                                          <Form.Group className={style.form_group}>
                                                <div className={style.icon + " d-flex align-items-center justify-content-center"}>
                                                      <i className="fa fa-user"></i>
                                                </div>
                                          <Form.Control className={style.login_form_control} type="text" onChange={handleUser} name="name" placeholder="Username" />
                                          </Form.Group>
                                          <Form.Group className={style.form_group}>
                                                <div className={style.icon + " d-flex align-items-center justify-content-center"}>
                                                      <i className="fa fa-lock"></i>
                                                </div>
                                          <Form.Control className={style.login_form_control} type="password" onChange={handleUser} name="pass" placeholder="Password" />
                                          </Form.Group>
                                          <Form.Group className="d-flex justify-content-center mt-4">
                                                <Button className={style.btnlogin +" px-5"} variant="outline-light" type="Submit" size="lg">Sign in</Button>
                                          </Form.Group>
                                    </Form>
                              </div>
                        </Col>
                  </Row>
            </Container>
      </div>
      )
}





export default LoginPage