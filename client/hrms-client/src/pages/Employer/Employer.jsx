import React, { useEffect } from "react"
import { useState } from "react"
import {useRouteMatch,useHistory} from "react-router-dom"

import {Container,Row,Col} from "react-bootstrap"

import Hero from "../../Components/Hero"

import styles from "../../styles/Employer.module.css"

//service
import EmployerService from "../../services/EmployerService"
import JobAdvertService from "../../services/JobAdvertService"

const JobSeeker = () => {

      const match = useRouteMatch("/firma/:id")
      const history = useHistory()

      const [data,setData] = useState({
            id:0,
            firstName: "",
            lastName: "",
            identityNo: 0,
            yearOfBirth: 0,
            companyName: "",
            phoneNumber: "",
            website: "",
            eposta: "",
            actived: false

      })

      const [jobAdverts,setJobAdverts] = useState([])

      useEffect(()=>{
            const id = match.params.id
            const init = async ()=>{
                  const res = await EmployerService.getById(Number(id))
                  if(res.success){
                        const jobA = await JobAdvertService.getByActiveAndEmployer(true,id)
                        console.log(jobA)
                        setData(res.data)
                        setJobAdverts(jobA.data)
                  }
            }
            init()
      },[match.params.id])

      if(!data.actived){
            return( 
            <div>
                  <Hero text="İş Veren Profil Bulunamadı" />
                  <div className={styles.Employer}>
                        <Container className="py-5">
                              <h1 className="text-center">Profil Bulunamadı</h1>
                        </Container>
                        
                  </div>
            </div>)
      }
      return (
      <div>
            <Hero text={data.companyName} />
            <div className={styles.Employer}>
                  <Container>
                        <Row>
                              <Col lg={8}>
                                    <div className={styles.Employer_element + " d-flex justify-content-between"}>
                                          <div className="d-flex align-items-center">
                                                <div className={styles.thumb}>
                                                      <img src="https://technext.github.io/job-board-2/img/svg_icon/1.svg" alt="" />
                                                </div>
                                                <div className={styles.content + " float-left"} >
                                                      <h4>{data.companyName}</h4>
                                                </div>
                                          </div>
                                    </div>
                                    <div className={styles.desc}>
                                          <div className="mb-5">
                                                <h4>Şirket İletişim</h4>
                                                <p>Telefon Numarası: <span>{data.phoneNumber}</span></p>
                                                {/* eslint-disable */}
                                                <p>Websitesi: <span><a href={"https://"+data.website} target="_blank">{data.website}</a></span></p>
                                          </div>
                                          <div>
                                                <h4>İlanlar</h4>
                                                <div>
                                                      {jobAdverts.map(item=>(
                                                            <div className={styles.Employer_element + " d-flex justify-content-between"} onClick={()=>history.push("/is-ilanlari/"+item.jobAdvertId)}>
                                                                  <div>
                                                                        <div className={styles.thumb}>
                                                                              <img src="https://technext.github.io/job-board-2/img/svg_icon/1.svg" alt="" />
                                                                        </div>
                                                                        <div className={styles.content + " float-left"} >
                                                                              <h4>{item.job.title}</h4>
                                                                              <div className="d-flex align-items-center">
                                                                                    <div className="mr-5">
                                                                                          <p><i className="fa fa-map-marker mr-1"></i> {item.city.name}</p>
                                                                                    </div>
                                                                                    <div className="mr-5">
                                                                                          <p><i className="fa fa-clock-o mr-1"></i> {item.fulltime?"Tam Zamanlı":"Yarı Zamanlı"}</p>
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      ))}
                                                      
                                                </div>
                                          </div>
                                    </div>
                              </Col>
                              <Col lg={4}>
                                    <div className={styles.Employer_sumary}>
                                          <div>
                                                <h3>İş Veren Bilgileri</h3>
                                          </div>
                                          <div>
                                                <ul>
                                                      <li>Ad: <span>{data.firstName}</span></li>
                                                      <li>Soyad: <span>{data.lastName}</span></li>
                                                      <li>Eposta: <span>{data.eposta}</span></li>
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