import React from "react"

import styles from "../styles/JobElement.module.css"

const JobElement = ({onClick,imgUrl,city,type,date,id})=>(
      <div className={styles.job_element + " d-flex justify-content-between"}>
            <div className="d-flex align-items-center">
                  <div className={styles.thumb}>
                        <img src="https://technext.github.io/job-board-2/img/svg_icon/1.svg" alt=""/>
                  </div>
                  <div className={styles.content + " float-left"} >
                        <a href="/" onClick={onClick}><h4>Software Engineer</h4></a>
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
                        <a className={styles.heart_mark} href="/"> <i className="fa fa-heart"></i> </a>
                        <a href="/" className={styles.apply_btn}>Apply Now</a>
                  </div>
                  <div className="date">
                        <p>Date line: 31 Jan 2020</p>
                  </div>
            </div>
      </div>
)


export default JobElement