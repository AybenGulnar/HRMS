import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useSelector,useDispatch} from "react-redux"
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import AuthAction from "../../store/actions/Admin"

//Service
import SystemStaffService from "../../services/SystemStaffService"

const useStyles = makeStyles((theme) => ({
      paper: {
            marginTop: theme.spacing(8),
            marginBottom:theme.spacing(12),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
      },
      avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
      },
      form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
      },
      submit: {
            margin: theme.spacing(3, 0, 2),
      },
}));

const PanelLogin = ()=>{

      const classes = useStyles();

      const dispatch = useDispatch()
      const history = useHistory()

      const isLogged = useSelector(state=> state.adminReducer)

      const [user,setUser] = useState({email:"",pass:"",remember:false})

      useEffect(()=>{
            if(isLogged.isLogged){
                  history.push("/panel")
            }
      },[isLogged,history])


      const handleChange = (e)=>{

            const {name,value,checked} = e.target

            setUser(prevValue=>{
                  if(name==="email"){
                        return({...prevValue,email:value})
                  }
                  else if(name==="pass"){
                        return({...prevValue,pass:value})
                  }
                  else if(name==="remember"){
                        return({...prevValue,remember:checked})
                  }
            })
      }


      const login = async(e)=>{
            e.preventDefault()
            const res = await SystemStaffService.login(user.email,user.pass)
            if(res.success){
                  dispatch(AuthAction.login(res.data.id))
                  history.push("/panel")
                  
            }else{
                  toast.error(res.message)
            }
            
      }

      return (
            <div className="d-flex align-items-center">
                  <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                              <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                              </Avatar>
                              <Typography component="h1" variant="h5">
                                    Admin Giriş Yap
                              </Typography>
                              <form className={classes.form} onSubmit={login}>
                                    <TextField
                                          variant="outlined"
                                          margin="normal"
                                          required
                                          fullWidth
                                          id="email"
                                          label="Eposta"
                                          name="email"
                                          value={user.email}
                                          autoComplete="email"
                                          autoFocus
                                          onChange={handleChange}
                                    />
                                    <TextField
                                          variant="outlined"
                                          margin="normal"
                                          required
                                          fullWidth
                                          name="pass"
                                          label="Şifre"
                                          type="password"
                                          id="password"
                                          autoComplete="current-password"
                                          value={user.pass}
                                          onChange={handleChange}
                                    />
                                    <Button
                                          type="submit"
                                          fullWidth
                                          variant="contained"
                                          color="primary"
                                          className={classes.submit}
                                    >
                                          Giriş Yap
                                    </Button>
                              </form>
                        </div>
                  </Container>
                  <ToastContainer />
            </div>
      )
}

export default PanelLogin