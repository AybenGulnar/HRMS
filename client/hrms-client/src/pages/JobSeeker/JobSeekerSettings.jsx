import React from "react"
import { Container, Row,Col } from "react-bootstrap"
import {Switch, Route,useHistory } from "react-router-dom"
import {useSelector} from "react-redux"

import Hero from "../../Components/Hero"

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useState } from "react";
import { useEffect } from "react";
//Components
import Main from "../../Components/JobSeekerSettings/Main"
import School from "../../Components/JobSeekerSettings/School/School";
import Experience from "../../Components/JobSeekerSettings/Experience/Experience";
import Language from "../../Components/JobSeekerSettings/Language/Language";
import Skill from "../../Components/JobSeekerSettings/Skill/Skill";
import SocialMedia from "../../Components/JobSeekerSettings/SocialMedia";



const JobSeekerSettings = ()=>{

      let history = useHistory();

      const isLogged = useSelector(state=> state.loggedReducer)

      useEffect(()=>{

            if(!isLogged.isLogged || isLogged.isEmployer){
                  history.push("/")
            }

            const temp = window.location.href.split("/")
            var param = temp[temp.length-1]

            if(param === "ayarlar"){
                  param = ""
            }
            
            setSelect(param)
      },[])

      const [select,setSelect] = useState("")

      const handleSelect = (e)=>{
            var name = e.currentTarget.name

            setSelect(name)
            history.push("/aday/ayarlar/"+name);
            
      }

      return(
            <>
                  <Hero text="Aday Ayarlar"/>
                  <Container className="my-4">
                        <Row>
                              <Col md={4}>
                              <ButtonGroup
                              orientation="vertical"
                              color="primary"
                              aria-label="vertical contained primary button group"
                              variant="contained"
                              className="w-100"
                              >
                                    <Button color={select === "" && "secondary"} name="" onClick={handleSelect}>Genel</Button>
                                    <Button color={select === "okullar" && "secondary"} name="okullar" onClick={handleSelect}>Okullar</Button>
                                    <Button color={select === "tecrubeler" && "secondary"} name="tecrubeler" onClick={handleSelect}>Tecrübeler</Button>
                                    <Button color={select === "diller" && "secondary"} name="diller" onClick={handleSelect}>Yabancı Diller</Button>
                                    <Button color={select === "beceriler" && "secondary"} name="beceriler" onClick={handleSelect}>Beceriler</Button>
                                    <Button color={select === "sosyal" && "secondary"} name="sosyal" onClick={handleSelect}>Sosyal Medya</Button>
                              </ButtonGroup>
                              </Col>
                              <Col md={8}>
                                    <div className="h-100 rounded shadow pt-4 pb-5 px-3 my-2">
                                          <Container fluid>
                                                <Switch>
                                    
                                                      <Route path="/aday/ayarlar/" exact>
                                                            <Main/>
                                                      </Route>

                                                      <Route path="/aday/ayarlar/okullar">
                                                            <School/>
                                                      </Route>

                                                      <Route path="/aday/ayarlar/tecrubeler">
                                                            <Experience/>
                                                      </Route>

                                                      <Route path="/aday/ayarlar/diller">
                                                            <Language/>
                                                      </Route>

                                                      <Route path="/aday/ayarlar/beceriler">
                                                            <Skill/>
                                                      </Route>

                                                      <Route path="/aday/ayarlar/sosyal">
                                                            <SocialMedia/>
                                                      </Route>
                                                      
                                                </Switch>
                                          </Container>
                                    </div>
                              </Col>
                        </Row>
                  </Container>
            </>
            
      )
}




export default JobSeekerSettings