import React, { useEffect,useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

//Components
import Hero from "../Components/Hero"
import JobElement from "../Components/JobElement"

import { Container,Row,Col } from "react-bootstrap"

import styles from "../styles/Jobs.module.css"

//Services
import JobAdvertService from "../services/JobAdvertService"
import CityService from "../services/CityService"

const useStyles = makeStyles((theme) => ({
      formControl: {
        minWidth: "100%",
      },
      selectEmpty: {
      },
}));

const Jobs = ()=>{
      const classes = useStyles();

      const [data,setData] = useState([])
      const [cities,setCities] = useState([])

      const [page,setPage] = useState(1)
      
      const [filter, setFilter] = useState({name:"",city:"",type:"",page:10});
      const [filteredData, setfilteredData] = useState([]);

      const indexOfLastPost = page * filter.page
      const indexOfFirstPost = indexOfLastPost-filter.page
      const currentPosts = filteredData.slice(indexOfFirstPost,indexOfLastPost)
      
      useEffect(()=>{
            const init = async ()=>{
                  const resCity = await CityService.getAll()

                  var resData = await JobAdvertService.getByActived(true)

                  setCities(resCity.data)
                  setData(resData.data)
                  setfilteredData(resData.data)

            }
            init()
      },[])

      const handleChange = (e) => {
            const {name,value} = e.target
            setFilter(prevValue=>{
                  if(name === "name"){
                        return({...prevValue,name:value})
                  }
                  else if(name === "city"){
                        return({...prevValue,city:value})
                  }
                  else if(name === "type"){
                        return({...prevValue,type:value})
                  }
                  else if(name === "page"){
                        return({...prevValue,page:Number(value)})
                  }
            })
      };



      const Filter = ()=>{
            var temp = [...data]
            
            temp = temp.filter(item => item.job.title.toLowerCase().includes(filter.name.toLowerCase()))
            temp = temp.filter(item => item.city.name.toLowerCase().includes(filter.city.toLowerCase()))
            if(filter.type !== ""){
                  const isFulltime = filter.type === "Tam Zamanlı" ? true : false;
                  console.log(isFulltime)
                  temp = temp.filter(item => item.fullTime === isFulltime)
            }
            
            setfilteredData(temp)
      }


      return(
            <div>
                 <Hero text={data.length+" İş İlanı"}/>
                 <div className={styles.jobs}>
                       <Container>
                              <Row>
                                    <Col lg={3} className={styles.filter}>
                                          <h3>Filtre</h3>
                                          <TextField label="İş Bul" name="name" className="mb-3 w-100" variant="outlined" onChange={handleChange} value={filter.name} />
                                          <FormControl variant="outlined" className={classes.formControl + " mb-3"}>
                                                <InputLabel id="sehir">Şehir</InputLabel>
                                                <Select
                                                labelId="sehir"
                                                native
                                                name="city"
                                                value={filter.city}
                                                onChange={handleChange}
                                                label="Şehir"
                                                >
                                                <option aria-label="None" value="" />
                                                {cities.map(item=>(
                                                      <option key={item.cityId}>{item.name}</option>
                                                ))}
                                                </Select>
                                          </FormControl>
                                          <FormControl variant="outlined" className={classes.formControl +" mb-3"}>
                                                <InputLabel id="type">Çalışma Türü</InputLabel>
                                                <Select
                                                labelId="type"
                                                native
                                                name="type"
                                                value={filter.type}
                                                onChange={handleChange}
                                                label="Çalışma Türü"
                                                >
                                                <option aria-label="None" value="" />
                                                <option>Tam Zamanlı</option>
                                                <option>Yarı Zamanlı</option>
                                                </Select>
                                          </FormControl>
                                          <button className={styles.btn_filter} onClick={Filter}>Filtrele</button>
                                    </Col>
                                    <Col lg={9}>
                                    <div className={styles.job_list_text}>
                                          <div className="row align-items-center">
                                                <div className="col-md-6">
                                                      <h4>İş İlanları</h4>
                                                </div>
                                                <div className="col-md-6">
                                                      <FormControl variant="outlined" className="float-right mb-3">
                                                            <InputLabel id="page">Sayfa</InputLabel>
                                                            <Select
                                                            labelId="page"
                                                            native
                                                            name="page"
                                                            value={filter.page}
                                                            onChange={handleChange}
                                                            label="Sayfa"
                                                            >
                                                            <option>10</option>
                                                            <option>20</option>
                                                            <option>50</option>
                                                            <option>100</option>
                                                            </Select>
                                                      </FormControl>
                                                </div>
                                          </div>
                                    </div>
                                    <div className={styles.job_list}>
                                          {filteredData.length ? currentPosts.map(item=>{
                                                return(<JobElement key={item.jobAdvertId} name={item.job.title} city={item.city.name} type={item.fullTime} date={item.deadline} id={item.jobAdvertId}/>)
                                          }):<h4 className="text-center">İş İlanı Bulunamadı</h4>}
                                          
                                    </div>
                                    <div className="d-flex justify-content-center">
                                          <div>
                                                {Array.from({length: Math.ceil(filteredData.length / filter.page)}, (_, i) => i + 1).map(item=>(
                                                      <button className={styles.number +" "+ (page === item && styles.active)} onClick={()=>setPage(item)}>
                                                            {item}
                                                      </button>
                                                ))}
                                          </div>
                                    </div>
                                    </Col>
                              </Row>
                       </Container>
                 </div>
            </div>
      )
}

export default Jobs