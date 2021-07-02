import React, { useEffect,useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom"

import { Container,Row,Col } from "react-bootstrap"

//Components
import Confirm from "./Confirm"
import Detail from "./Detail"

import styles from "../../../styles/PanelJobAdvert.module.css"

//Services
import JobAdvertService from "../../../services/JobAdvertService"
import CityService from "../../../services/CityService"

const useStyles = makeStyles((theme) => ({
      formControl: {
        minWidth: "100%",
      },
      selectEmpty: {
      },
}));

const JobAdvertPage = ()=>{
      const classes = useStyles();
      const history = useHistory()

      const [detail,setDetail] = useState(false)
      const [confirm,setConfirm] = useState(false)

      const [data,setData] = useState([])
      const [cities,setCities] = useState([])
      
      const [filter, setFilter] = useState({
            name:"",
            city:"",
            type:""
      });
      const [filteredData, setfilteredData] = useState([]);

      const [select,setSelect] = useState({
            jobAdvertId: 0,
            job: {
                  title: "",
                  id:0
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
            const init = async ()=>{
                  const resCity = await CityService.getAll()

                  var resData = await JobAdvertService.getAll()

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

      return(<>
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
                              </div>
                        </div>
                        <div className={styles.job_list}>
                              <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                          <TableHead>
                                                <TableRow>
                                                      <TableCell><b>İş ismi</b></TableCell>
                                                      <TableCell align="right"><b>Çalışma Türü</b></TableCell>
                                                      <TableCell align="right"><b>Aktif</b></TableCell>
                                                      <TableCell align="right"><b>İşlemler</b></TableCell>
                                                      
                                                </TableRow>
                                          </TableHead>
                                          <TableBody>
                                                {filteredData.map((row) => (
                                                      <TableRow key={row.jobAdvertId}>
                                                            <TableCell component="th" scope="row">
                                                                  {row.job.title}
                                                            </TableCell>
                                                            <TableCell align="right">{row.fullTime?"Tam Zamanlı" : "Yarı Zamanlı"}</TableCell>
                                                            <TableCell align="right">{row.actived? "Aktif":"Onay Bekleniyor..."}</TableCell>
                                                            <TableCell align="right">
                                                                  <Button variant="contained" color="" className="mb-1" onClick={() => {
                                                                        setSelect(row)
                                                                        setTimeout(() => { setDetail(true) }, 500)
                                                                  }}>
                                                                        Detay
                                                                  </Button>
                                                                  {row.actived ? <button class={styles.tick} onClick={() => {
                                                                        setSelect(row)
                                                                        setTimeout(() => { setConfirm(true) }, 500)
                                                                  }}>
                                                                        <i class="fas fa-check"></i>
                                                                  </button>:<button class={styles.close} onClick={() => {
                                                                        setSelect(row)
                                                                        setTimeout(() => { setConfirm(true) }, 500)
                                                                  }}>
                                                                        <i class="fas fa-times"></i>
                                                                  </button>}
                                                            </TableCell>
                                                      </TableRow>
                                                ))}
                                          </TableBody>
                                    </Table>
                              </TableContainer>
                              
                        </div>
                        </Col>
                  </Row>
            </Container>
            <Detail open={detail} setOpen={setDetail} data={select}/>
            <Confirm open={confirm} setOpen={setConfirm} select={select} setData={setData} setfilteredData={setfilteredData} />
      </>)
}

export default JobAdvertPage