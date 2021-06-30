import React from "react"
import { useHistory } from "react-router"

import styles from "../styles/JobElement.module.css"

const JobElement = ({name,imgUrl,city,type,date,id})=>{

      const history = useHistory()

      return(<div className={styles.job_element + " d-flex justify-content-between"} onClick={()=>history.push("/is-ilanlari/"+id)}>
            <div className="d-flex align-items-center">
                  <div className={styles.thumb}>
                        <img src="https://technext.github.io/job-board-2/img/svg_icon/1.svg" alt=""/>
                  </div>
                  <div className={styles.content + " float-left"} >
                        <h4 >{name}</h4>
                        <div className="d-flex align-items-center">
                        <div className="mr-5">
                              <p><i className="fa fa-map-marker mr-1"></i> {city}</p>
                        </div>
                        <div className="mr-5">
                              <p><i className="fa fa-clock-o mr-1"></i> {type ? "Tam Zamanlı" : "Yarı Zamanlı"}</p>
                        </div>
                        </div>
                  </div>
            </div>
            <div className={styles.right}>
                  <div>
                        <button className={styles.heart_mark} href="/"> <i className="fa fa-heart"></i> </button>
                        <button className={styles.apply_btn}>Başvur</button>
                  </div>
                  <div className="date">
                        <p>{new Date(date).toDateString()}</p>
                  </div>
            </div>
      </div>)
}


export default JobElement