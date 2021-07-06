import React,{ useState,useEffect }  from "react"
import { Container, Row,Col } from "react-bootstrap"
import {Switch, Route,useHistory } from "react-router-dom"
import {useSelector} from "react-redux"

import Hero from "../../Components/Hero"

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
//Components
import Main from "../../Components/EmployerSettings/Main"



const EmployerSettings = ()=>{

      let history = useHistory();
      
      const isLogged = useSelector(state=> state.loggedReducer)

      useEffect(()=>{
            if(!isLogged.isLogged || !isLogged.isEmployer){
                  history.push("/")
            }

            const temp = window.location.href.split("/")
            var param = temp[temp.length-1]

            if(param === "ayarlar"){
                  param = ""
            }
            
            setSelect(param)
      },[isLogged,history])

      const [select,setSelect] = useState("")

      const handleSelect = (e)=>{
            const name = e.currentTarget.name

            setSelect(name)
            history.push("/firma/ayarlar/"+name);
            
      }

      return(
            <>
                  <Hero text="Firma Ayarlar"/>
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
                              </ButtonGroup>
                              </Col>
                              <Col md={8}>
                                    <div className="h-100 rounded shadow pt-4 pb-5 px-3 my-2">
                                          <Container fluid>
                                                <Switch>
                                    
                                                      <Route path="/firma/ayarlar/" exact>
                                                            <Main/>
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




export default EmployerSettings