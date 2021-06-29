import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//Components
import Add from "./Add"
import Edit from "./Edit"
import Delete from "./Delete"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Experience = ()=>{
      const classes = useStyles();

      const [add,setAdd] = useState(false)
      const [edit,setEdit] = useState(false)
      const [del,setDel] = useState(false)

      const [experience,setExperience] = useState({
            id:0,
            companyName: '',
            position: '',
            start_year: '',
            leave_year: ''
      })

      const [data,setData] = useState([
            {id:1,companyName:'Gazi Üniversitesi', position:'Hoca',start_year:1999,leave_year:2004},
            {id:2,companyName:'Microsoft', position:'Senior',start_year:2004,leave_year:2008},
            {id:3,companyName:'Apple', position:'CTO',start_year:2012,leave_year:2016}
          ])

      return(<div>
            <button className="btn-green float-right" onClick={()=>{setAdd(true)}}>Ekle</button>
            <div className="py-4"></div>
            <div className="p-1">
                  <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                              <TableCell><b>Şirket İsmi</b></TableCell>
                              <TableCell align="right"><b>Pozisyon</b></TableCell>
                              <TableCell align="right"><b>Başlama Yılı</b></TableCell>
                              <TableCell align="right"><b>Çıkış Yılı</b></TableCell>
                              <TableCell align="right"><b>İşlemler</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                              {data.map((row) => (
                                    <TableRow key={row.companyName}>
                                    <TableCell component="th" scope="row">
                                    {row.companyName}
                                    </TableCell>
                                    <TableCell align="right">{row.position}</TableCell>
                                    <TableCell align="right">{row.start_year}</TableCell>
                                    <TableCell align="right">{row.leave_year}</TableCell>
                                    <TableCell align="right">
                                          <Button variant="contained" color="primary" className="mb-1" onClick={()=>{
                                                setExperience(row)
                                                setTimeout(()=>{setEdit(true)},500)
                                          }}>
                                          Düzenle
                                          </Button>
                                          <Button variant="contained" color="secondary" onClick={()=>{
                                                setExperience(row)
                                                setTimeout(()=>{setDel(true)},500)
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
            <Add open={add} setOpen={setAdd} />
            <Edit open={edit} setOpen={setEdit} experience={experience}/>
            <Delete open={del} setOpen={setDel} experience={experience} setData={setData} />
      </div>)
}

export default Experience