import React from "react"

//Components
import Hero from "../Components/Hero"

import { Container,Row,Col } from "react-bootstrap"

import styles from "../styles/Jobs.module.css"



const Jobs = ()=>{
      return(
            <div>
                 <Hero text="57523+ İş ilanı"/>
                 <div className={styles.jobs}>
                       <Container>
                              <Row>
                                    <Col lg={3}></Col>
                                    <Col lg={9}></Col>
                              </Row>
                       </Container>
                 </div>
            </div>
      )
}

export default Jobs