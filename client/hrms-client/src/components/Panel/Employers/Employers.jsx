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

import { Container,Row,Col } from "react-bootstrap"

//Components
import Confirm from "./Confirm"
import Detail from "./Detail"

import styles from "../../../styles/PanelEmployers.module.css"

//Services
import EmployerService from "../../../services/EmployerService"

const useStyles = makeStyles((theme) => ({
      formControl: {
        minWidth: "100%",
      },
      selectEmpty: {
      },
}));

const Employers = ()=>{
      const classes = useStyles()

      const [detail,setDetail] = useState(false)
      const [confirm,setConfirm] = useState(false)

      const [data,setData] = useState([])
      
      const [filter, setFilter] = useState({
            firstName:"",
      });
      const [filteredData, setfilteredData] = useState([]);

      const [select,setSelect] = useState({
            actived: false,
            companyName: "",
            eposta: "",
            firstName: "",
            id: 0,
            identityNo: 0,
            lastName: "",
            password: "",
            phoneNumber: "",
            ucompanyName: "",
            ufirstName: "",
            ulastName: "",
            updated: false,
            uphoneNumber: "",
            uwebsite: "",
            uyearOfBirth: 0,
            website: "",
            yearOfBirth: 0,

      })
      
      useEffect(()=>{
            const init = async ()=>{

                  var res = await EmployerService.getAll()
                  console.log(res)

                  setData(res)
                  setfilteredData(res)

            }
            init()
      },[])

      const handleChange = (e) => {
            const {value} = e.target
            setFilter({firstName:value})
      };



      const Filter = ()=>{
            var temp = [...data]

            temp = temp.filter(item => item.firstName.toLowerCase().includes(filter.firstName.toLowerCase()))
            
            setfilteredData(temp)
      }

      return(<>
            <Container>
                  <Row>
                        <Col lg={3} className={styles.filter}>
                              <h3>Filtre</h3>
                              <TextField label="İsmi ile Bul" name="name" className="mb-3 w-100" variant="outlined" onChange={handleChange} value={filter.firstName} />
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
                                                      <TableCell><b>İsim</b></TableCell>
                                                      <TableCell align="right"><b>Güncel</b></TableCell>
                                                      <TableCell align="right"><b>Aktif</b></TableCell>
                                                      <TableCell align="right"><b>İşlemler</b></TableCell>
                                                      
                                                </TableRow>
                                          </TableHead>
                                          <TableBody>
                                                {filteredData.map((row) => (
                                                      <TableRow key={row.id}>
                                                            <TableCell component="th" scope="row">
                                                                  {row.firstName + " " + row.lastName}
                                                            </TableCell>
                                                            <TableCell align="right">{row.updated?"Güncel" : "Onay Bekleniyor..."}</TableCell>
                                                            <TableCell align="right">{row.actived? "Aktif":"Onay Bekleniyor..."}</TableCell>
                                                            <TableCell align="right">
                                                                  <Button variant="contained" color="" className="mb-1" onClick={() => {
                                                                        setSelect(row)
                                                                        setTimeout(() => { setDetail(true) }, 500)
                                                                  }}>
                                                                        Detay
                                                                  </Button>
                                                                  {(row.actived && row.updated) ? <button className={styles.tick} disabled={true} onClick={() => {
                                                                        setSelect(row)
                                                                        setTimeout(() => { setConfirm(true) }, 500)
                                                                  }}>
                                                                        <i class="fas fa-check"></i>
                                                                  </button>:<button className={styles.close} onClick={() => {
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

export default Employers