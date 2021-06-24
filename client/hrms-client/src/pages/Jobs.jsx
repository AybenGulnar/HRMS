import React from "react"
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


const useStyles = makeStyles((theme) => ({
      formControl: {
        minWidth: "100%",
      },
      selectEmpty: {
      },
}));

const Jobs = ()=>{

      const classes = useStyles();
      const [filter, setFilter] = React.useState({name:"",city:"",type:""});

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
            })
      };

      const Filter = ()=>{
            console.log(filter)
      }


      return(
            <div>
                 <Hero text="57523+ İş ilanı"/>
                 <div className={styles.jobs}>
                       <Container>
                              <Row>
                                    <Col lg={3} className={styles.filter}>
                                          <h3>Filter</h3>
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
                                                <option>Trabzon</option>
                                                <option>İstanbul</option>
                                                <option>İzmir</option>
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
                                                      <h4>Job Listing</h4>
                                                </div>
                                          </div>
                                    </div>
                                    <div className={styles.job_list}>
                                          {[1,2,3].map(item=>{
                                                return(<JobElement/>)
                                          })}
                                          
                                    </div>
                                    </Col>
                              </Row>
                       </Container>
                 </div>
            </div>
      )
}

export default Jobs