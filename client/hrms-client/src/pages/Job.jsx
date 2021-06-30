import React, { useEffect } from "react"
import { useState } from "react"
import {useRouteMatch} from "react-router-dom"

import {Container,Row,Col} from "react-bootstrap"
 
//Components
import Hero from "../Components/Hero"

import styles from "../styles/Job.module.css"

//service
import JobAdvertService from "../services/JobAdvertService"

const Job = ()=>{

      const match = useRouteMatch("/is-ilanlari/:id")

      const [data,setData] = useState({
            "jobAdvertId": 0,
            job: {
                  title: ""
            },
            description: "",
            city: {
                  name: ""
            },
            salaryMin: 0,
            salaryMax: 0,
            openPositionCount: 0,
            deadline: "",
            publishingDate: "",
            employer: {
                  companyName: "",
            },
            actived: false,
            fullTime: false,
            remote: false
      })

      useEffect(()=>{
            const id = match.params.id
            const init = async ()=>{
                  const res = await JobAdvertService.getById(Number(id))
                  if(res.success){
                        setData(res.data)
                  }
            }
            init()
      },[match.params.id])

      if(!data.actived){
            return( 
            <div>
                  <Hero text="İş İlanı Bulunamadı" />
                  <div className={styles.job}>
                        <Container className="py-5">
                              <h1 className="text-center">İş İlanı Bulunamadı</h1>
                        </Container>
                        
                  </div>
            </div>)
      }
      return(
            <div>
                  <Hero text={data.job.title}/>
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
                                                      <a href="/"><h4>{data.job.title}</h4></a>
                                                      <div className="d-flex align-items-center">
                                                      <div className="mr-5">
                                                            <p><i className="fa fa-map-marker mr-1"></i> {data.city.name}</p>
                                                      </div>
                                                      <div className="mr-5">
                                                            <p><i className="fa fa-clock-o mr-1"></i> {data.fullTime ? "Tam Zamanlı":"Yarı Zamanlı"}</p>
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
                                                <p>{data.description}</p>
                                          </div>
                                    </div>
                                    </Col>
                                    <Col lg={4}>
                                          <div className={styles.job_sumary}>
                                                <div>
                                                      <h3>İş Özellikleri</h3>
                                                </div>
                                                <div>
                                                      <ul>
                                                            <li>Açık Pozisyon Sayısı: <span>{data.openPositionCount}</span></li>
                                                            <li>Maaş Aralığı: <span>{data.salaryMin} {data.salaryMax}</span></li>
                                                            <li>Yayınlanma Tarihi: <span>{new Date(data.publishingDate).toDateString()}</span></li>
                                                            <li>İlan Bitiş Tarihi: <span>{new Date(data.deadline).toDateString()}</span></li>
                                                            <li>Remote: <span>{data.remote ? "Evet": "Hayır"}</span></li>
                                                            <li>Şirket İsmi: <span> {data.employer.companyName}</span></li>
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