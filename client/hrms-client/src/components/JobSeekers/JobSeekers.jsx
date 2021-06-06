import React, { useEffect, useState } from 'react';

//Service
import JobSeekerService from "../../services/JobSeekerService"

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const classes = useStyles();

  const [users,setUsers] = useState([]);

  useEffect(()=>{

    const init = async ()=>{
      const data = await JobSeekerService.getAll()
      setUsers(data)
    }

    init()
  },[])


  

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ad Soyad</TableCell>
              <TableCell align="right">TC Kimlik No</TableCell>
              <TableCell align="right">Eposta</TableCell>
              <TableCell align="right">Doğum Yılı</TableCell>
              <TableCell align="right">github</TableCell>
              <TableCell align="right">linkedin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell align="right">{user.identityNo}</TableCell>
                <TableCell align="right">{user.eposta}</TableCell>
                <TableCell align="right">{user.yearOfBirth}</TableCell>
                <TableCell align="right">{user.github}</TableCell>
                <TableCell align="right">{user.linkedin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}