import React, { useEffect } from "react"
import { useState } from "react"
import {useRouteMatch} from "react-router-dom"

import {Container,Row,Col} from "react-bootstrap"

import Hero from "../../Components/Hero"

import styles from "../../styles/JobSeeker.module.css"

//service
import JobSeekerService from "../../services/JobSeekerService"

const JobSeeker = () => {

      const match = useRouteMatch("/aday/:id")

      const [data,setData] = useState({
            id: 0,
            firstName: "",
            lastName: "",
            identityNo: 0,
            yearOfBirth: 0,
            imageUrl: "",
            github: "",
            linkedin: "",
            introducingText: "",
            actived: false,
            eposta: ""
      })

      const [schools,setSchools] = useState([])
      const [experiences,setExperiences] = useState([])
      const [foreignLanguages,setForeignLanguages] = useState([])
      const [skills,setSkills] = useState([])

      useEffect(()=>{
            const id = match.params.id
            const init = async ()=>{
                  const res = await JobSeekerService.getById(id)
                  if(res.success){
                        setData(res.data)
                        const resSchools = await JobSeekerService.getSchoolsByUserId(id)
                        const resExperiences = await JobSeekerService.getExperiencesByUserId(id)
                        const resForeignLanguages = await JobSeekerService.getForeignLanguagesByUserId(id)
                        const resSkills = await JobSeekerService.getSkillsByUserId(id)
                        setSchools(resSchools)
                        setExperiences(resExperiences)
                        setForeignLanguages(resForeignLanguages)
                        setSkills(resSkills)
                  }
            }
            init()
      },[match.params.id])

      if(!data.actived){
            return( 
            <div>
                  <Hero text="İş Arayan Profil Bulunamadı" />
                  <div className={styles.JobSeeker}>
                        <Container className="py-5">
                              <h1 className="text-center">Profil Bulunamadı</h1>
                        </Container>
                        
                  </div>
            </div>)
      }

      return (
      <div>
            <Hero text={data.firstName + " " + data.lastName} />
            <div className={styles.JobSeeker}>
                  <Container>
                        <Row>
                              <Col lg={8}>
                                    <div className={styles.JobSeeker_element + " d-flex justify-content-between"}>
                                          <div className="d-flex align-items-center">
                                                <div className={styles.thumb}>
                                                      <img src={data.imageUrl !== "" ? data.imageUrl :"/profile.jpg"} alt="" />
                                                </div>
                                                <div className={styles.content + " float-left"} >
                                                      <h4>{data.firstName + " " + data.lastName}</h4>
                                                </div>
                                          </div>
                                    </div>
                                    <div className={styles.desc}>
                                          <div>
                                                <h4>Aday Tanıtım</h4>
                                                <p>{data.introducingText}</p>
                                                <div>
                                                      <h5>Okullar</h5>
                                                      <ul>
                                                            {schools.map(item=>(
                                                                  <li>{item.schoolName} {item.department} {item.startYear}-{item.graduatedYear}</li>
                                                            ))}
                                                      </ul>
                                                </div>
                                                <div>
                                                      <h5>Tecrübeler</h5>
                                                      <ul>
                                                            {experiences.map(item=>(
                                                                  <li key={item.id}>{item.companyName} {item.position} {item.startYear}-{item.leaveYear}</li>
                                                            ))}
                                                      </ul>
                                                </div>
                                                <div>
                                                      <h5>Yabancı Diller</h5>
                                                      <ul>
                                                            {foreignLanguages.map(item=>(
                                                                  <li key={item.id}>{item.name} Seviye:{item.level}</li>
                                                            ))}
                                                      </ul>
                                                </div>
                                                <div>
                                                      <h5>Beceriler</h5>
                                                      <ul>
                                                            {skills.map(item=>(
                                                                  <li key={item.id}>{item.name}</li>
                                                            ))}
                                                      </ul>
                                                </div>
                                          </div>
                                    </div>
                              </Col>
                              <Col lg={4}>
                                    <div className={styles.JobSeeker_sumary}>
                                          <div>
                                                <h3>Aday Bilgileri</h3>
                                          </div>
                                          <div>
                                                <ul>
                                                      <li>Eposta: <span>{data.eposta}</span></li>
                                                      <li>Github: <span>{data.github}</span></li>
                                                      <li>Linkedin: <span>{data.linkedin}</span></li>
                                                </ul>
                                          </div>
                                    </div>
                              </Col>
                        </Row>
                  </Container>
            </div>
      </div>
      )
}


export default JobSeeker