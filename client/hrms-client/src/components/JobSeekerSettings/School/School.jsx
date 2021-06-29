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

const School = ()=>{
      const classes = useStyles();

      const [add,setAdd] = useState(false)
      const [edit,setEdit] = useState(false)
      const [del,setDel] = useState(false)

      const [school,setSchool] = useState({
            id:0,
            name: '',
            departmant: '',
            start_year: '',
            graduated_year: ''
      })

      const [data,setData] = useState([
            {id:1,name:'Gazi Üniversitesi', departmant:'Bilgisayar Mühendisliği',start_year:1999,graduated_year:2004},
            {id:2,name:'İstanbul Üniversitesi', departmant:'Makine Mühendisliği',start_year:2004,graduated_year:2008},
            {id:3,name:'Ankara Üniversitesi', departmant:'İşletme',start_year:2012,graduated_year:2016}
          ])

      return(<div>
            <button className="btn-green float-right" onClick={()=>{setAdd(true)}}>Ekle</button>
            <div className="py-4"></div>
            <div className="p-1">
                  <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                              <TableCell><b>Okul İsmi</b></TableCell>
                              <TableCell align="right"><b>Departman</b></TableCell>
                              <TableCell align="right"><b>Başlama Yılı</b></TableCell>
                              <TableCell align="right"><b>Mezuniyet Yılı</b></TableCell>
                              <TableCell align="right"><b>İşlemler</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                              {data.map((row) => (
                                    <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                    {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.departmant}</TableCell>
                                    <TableCell align="right">{row.start_year}</TableCell>
                                    <TableCell align="right">{row.graduated_year}</TableCell>
                                    <TableCell align="right">
                                          <Button variant="contained" color="primary" className="mb-1" onClick={()=>{
                                                setSchool(row)
                                                setTimeout(()=>{setEdit(true)},500)
                                          }}>
                                          Düzenle
                                          </Button>
                                          <Button variant="contained" color="secondary" onClick={()=>{
                                                setSchool(row)
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
            <Edit open={edit} setOpen={setEdit} school={school}/>
            <Delete open={del} setOpen={setDel} school={school} setData={setData} />
      </div>)
}

export default School