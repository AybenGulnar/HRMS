import React,{useEffect, useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Container } from "react-bootstrap"
import {useHistory} from "react-router-dom"
import {useSelector} from "react-redux"

//Components
import Hero from "../../Components/Hero"
import Add from "../../Components/JobAdvert/Add"
import Delete from "../../Components/JobAdvert/Delete"

//Services
import JobAdvertService from "../../services/JobAdvertService"

const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });

const JobAdvert = () => {
      const classes = useStyles();

      const history = useHistory()
      
      const isLogged = useSelector(state=> state.loggedReducer)

      const [add,setAdd] = useState(false)
      const [del,setDel] = useState(false)

      const [select,setSelect] = useState({
            id:0,
            name: '',
            isFullTime:false,
            isActived:false
      })

      const [data,setData] = useState([])

      useEffect(()=>{
            if(!isLogged.isLogged || !isLogged.isEmployer){
                  history.push("/")
            }
            const init = async ()=>{
                  const res = await JobAdvertService.getByEmployer(isLogged.id)
                  setData(res.data)
            }
            init()
      },[history,isLogged])


      return (<>
            <Hero text="Firma İlanları" />
            <Container>
                  <button className="btn-green float-right mt-2" onClick={()=>{setAdd(true)}}>Ekle</button>
                  <div className="clearfix py-5" />
                  <div className="px-1 pb-4 mb-3">
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
                                          {data.map((row) => (
                                                <TableRow key={row.jobAdvertId}>
                                                      <TableCell component="th" scope="row">
                                                            {row.job.title}
                                                      </TableCell>
                                                      <TableCell align="right">{row.fullTime?"Tam Zamanlı" : "Yarı Zamanlı"}</TableCell>
                                                      <TableCell align="right">{row.actived? "Aktif":"Onay Bekleniyor..."}</TableCell>
                                                      <TableCell align="right">
                                                            <Button variant="contained" color="" className="mb-1" disabled={!row.actived} onClick={() => {
                                                                  history.push("/is-ilanlari/"+row.jobAdvertId)
                                                            }}>
                                                                  İlana Git
                                                            </Button>
                                                            <Button variant="contained" color="secondary" onClick={() => {
                                                                  setSelect(row)
                                                                  setTimeout(() => { setDel(true) }, 500)
                                                            }}>
                                                                  Sil
                                                            </Button>
                                                      </TableCell>
                                                </TableRow>
                                          ))}
                                    </TableBody>
                              </Table>
                        </TableContainer>
                  </div>
            </Container>
            <Add open={add} setOpen={setAdd} setData={setData} />
            <Delete open={del} setOpen={setDel} jobAdvert={select} setData={setData} />
      </>)
}


export default JobAdvert