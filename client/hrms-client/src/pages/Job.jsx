import React from "react"

import {Container,Row,Col} from "react-bootstrap"
 
//Components
import Hero from "../Components/Hero"
import JobElement from "../Components/JobElement"

import styles from "../styles/Job.module.css"

const Job = ()=>{
      return(
            <div>
                  <Hero text="Software Engineer"/>
                  <div className={styles.job}>
                        <Container>
                              <Row>
                                    <Col lg={8}>
                                    <div className={styles.job_element + " d-flex justify-content-between"}>
                                          <div className="d-flex align-items-center">
                                                <div className={styles.thumb}>
                                                      <img src="https://technext.github.io/job-board-2/img/svg_icon/1.svg" alt=""/>
                                                </div>
                                                <div className={styles.content + " float-left"} >
                                                      <a href="/"><h4>Software Engineer</h4></a>
                                                      <div className="d-flex align-items-center">
                                                      <div className="mr-5">
                                                            <p><i className="fa fa-map-marker mr-1"></i> California, USA</p>
                                                      </div>
                                                      <div className="mr-5">
                                                            <p><i className="fa fa-clock-o mr-1"></i> Part-time</p>
                                                      </div>
                                                      </div>
                                                </div>
                                          </div>
                                          <div className={styles.right}>
                                                <div>
                                                      <a className={styles.heart_mark} href="/"> <i className="far fa-heart"></i> </a>
                                                </div>
                                          </div>
                                    </div>
                                    <div className={styles.desc}>
                                          <div>
                                                <h4>İlan Açıklama</h4>
                                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.</p>
                                                <p>Variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.</p>
                                          </div>
                                    </div>
                                    </Col>
                                    <Col lg={4}>
                                          <div className={styles.job_sumary}>
                                                <div>
                                                      <h3>Job Summery</h3>
                                                </div>
                                                <div>
                                                      <ul>
                                                            <li>Published on: <span>12 Nov, 2019</span></li>
                                                            <li>Vacancy: <span>2 Position</span></li>
                                                            <li>Salary: <span>50k - 120k/y</span></li>
                                                            <li>Location: <span>California, USA</span></li>
                                                            <li>Job Nature: <span> Full-time</span></li>
                                                      </ul>
                                                </div>
                                                <button className={styles.btn}>Başvur</button>
                                          </div>
                                    </Col>
                              </Row>
                        </Container>
                  </div>
            </div>
      )
}

export default Job