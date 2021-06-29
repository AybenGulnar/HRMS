import React,{useState} from "react"
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

//Components
import Hero from "../../Components/Hero"
import Add from "../../Components/JobAdvert/Add"
import Edit from "../../Components/JobAdvert/Edit"
import Delete from "../../Components/JobAdvert/Delete"

const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });

const JobAdvert = () => {
      const classes = useStyles();

      const history = useHistory()

      const [add,setAdd] = useState(false)
      const [edit,setEdit] = useState(false)
      const [del,setDel] = useState(false)

      const [select,setSelect] = useState({
            id:0,
            name: '',
            isFullTime:false,
            isActived:false
      })

      const [data,setData] = useState([
            {id:1,name:'Software Enginnering',isFullTime:false,isActived:false },
            {id:2,name:'Java Developer',isFullTime:true,isActived:false },
            {id:3,name:'Javascript Developer',isFullTime:false,isActived:true },
            {id:4,name:'React Developer',isFullTime:true,isActived:true },
      ])


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
                                                <TableRow key={row.id}>
                                                      <TableCell component="th" scope="row">
                                                            {row.name}
                                                      </TableCell>
                                                      <TableCell align="right">{row.isFullTime?"Tam Zamanlı" : "Yarı Zamanlı"}</TableCell>
                                                      <TableCell align="right">{row.isActived? "Aktif":"Onay Bekleniyor..."}</TableCell>
                                                      <TableCell align="right">
                                                            <Button variant="contained" color="" className="mb-1" disabled={!row.isActived} onClick={() => {
                                                                  history.push("/is-ilanlari/"+row.id)
                                                            }}>
                                                                  İlana Git
                                                            </Button>
                                                            <Button variant="contained" color="primary" className="mb-1" disabled={!row.isActived} onClick={() => {
                                                                  setSelect(row)
                                                                  setTimeout(() => { setEdit(true) }, 500)
                                                            }}>
                                                                  Düzenle
                                                            </Button>
                                                            <Button variant="contained" color="secondary" disabled={!row.isActived} onClick={() => {
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
            <Add open={add} setOpen={setAdd} />
            <Edit open={edit} setOpen={setEdit} jobAdvert={select}/>
            <Delete open={del} setOpen={setDel} jobAdvert={select} setData={setData} />
      </>)
}


export default JobAdvert