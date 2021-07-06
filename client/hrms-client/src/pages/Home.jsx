import React,{useState,useEffect} from "react"

import styles from "../styles/Home.module.css"

import img from "../assets/illustration.png"
import { useHistory } from "react-router-dom"
import Fade from 'react-reveal/Fade';

//Services
import JobAdvertService from "../services/JobAdvertService"

const Home = ()=>{

      const history = useHistory();

      const [data,setData] = useState([])

      useEffect(()=>{
            const init = async ()=>{

                  var resData = await JobAdvertService.getByActived(true)
                  setData(resData.data)

            }
            init()
      },[])

      return(
      <div className={styles.home}>
            <div className={styles.home_bg+" d-flex align-items-center"}>
                  <div className="container">
                  <div className="row align-items-center">
                        <div className="col-lg-7 col-md-6">
                              <Fade left>
                                    <div className={styles.home_text}>
                                    <h5>{data.length} İş ilanı</h5>
                                    <h3>Hayalindeki işi bul!</h3>
                                    <p>Hızlı ve güvenilir bir şekilde anında sana uygun işi bulmanı sağlıyoruz.</p>
                                    <button className={styles.btn} onClick={()=>history.push("/is-ilanlari")}>İŞ BUL</button>
                                    </div>
                              </Fade>
                        </div>
                  </div>
                  </div>
            </div>
            <Fade>
                  <div className={styles.img + " d-none d-lg-block text-right"}>
                        <img src={img} alt=""/>
                  </div>
            </Fade>
      </div>)
}

export default Home