import React from "react"
import { useHistory } from "react-router"
import {useSelector,useDispatch} from "react-redux"

//Actions
import FavAction from "../store/actions/Fav"


import styles from "../styles/JobElement.module.css"

const JobElement = ({name,imgUrl,city,type,date,id})=>{

      const history = useHistory()
      const dispatch = useDispatch()

      const Favs = useSelector(state=> state.favReducer)
      const isLogged = useSelector(state=> state.loggedReducer)

      const toggleFav = ()=>{
            if(isLogged.isLogged){
                  const temp = Favs.find(item=>Number(item.id) === Number(id))
                  console.log(temp)
                  if(!temp){
                        dispatch(FavAction.ADD(Number(id),name))
                  }
                  else{
                        dispatch(FavAction.DEL(Number(id)))
                  }
            }
      }

      const goAdvert=(e)=>{
            if(e.target.name !== "fav"){
                  history.push("/is-ilanlari/"+id)
            }
            
      }

      return(<div className={styles.job_element + " d-flex justify-content-between"}>
            <div className="d-flex align-items-center" onClick={goAdvert}>
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
                        <button className={styles.heart_mark} onClick={toggleFav} name="fav" style={Favs.find(item=>Number(item.id) === Number(id)) ? {backgroundColor:"#00D363"}:{}} href="/"> <span name="fav"><i className="fa fa-heart" style={Favs.find(item=>Number(item.id) === Number(id)) ? {color:"white"}:{}}></i></span> </button>
                        <button className={styles.apply_btn} name="fav" onClick={toggleFav}>Başvur</button>
                  </div>
                  <div className="date">
                        <p>{new Date(date).toDateString()}</p>
                  </div>
            </div>
      </div>)
}


export default JobElement