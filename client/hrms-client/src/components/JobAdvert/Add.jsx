import React,{useState,useEffect} from "react"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useTheme } from '@material-ui/core/styles';
import { Form } from "react-bootstrap"
import { Formik } from 'formik';
import * as Yup from "yup";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useSelector} from "react-redux"

//Services
import CityService from "../../services/CityService"
import JobService from "../../services/JobService"
import JobAdvertService from "../../services/JobAdvertService"

const Schema = Yup.object().shape({
      jobId: Yup.string()
            .required('Doldurmak Zorunlu!'),
      cityId: Yup.string()
            .required('Doldurmak Zorunlu!'),
      description:Yup.string()
            .required('Doldurmak Zorunlu!'),
      salaryMin:Yup.number()
            .typeError('Ücret Sayı Olmalı!')
            .required('Doldurmak Zorunlu!')
            .integer('Tam Sayı Olmak!')
            .min(1000,"1000'den küçük olamaz!"),
      salaryMax:Yup.number()
            .typeError('Ücret Sayı Olmalı!')
            .required('Doldurmak Zorunlu!')
            .integer('Tam Sayı Olmak!')
            .min(1000,"1000'den küçük olamaz!"),
      openPositionCount: Yup.number()
            .typeError('Açık Pozisyon Sayısı Sayı Olmalı!')
            .required('Doldurmak Zorunlu!')
            .integer('Tam Sayı Olmak!')
            .min(1,"1'den küçük olamaz!"),
      deadline: Yup.string()
            .required('Doldurmak Zorunlu!'),
});

const useStyles = makeStyles((theme) => ({
      formControl: {
        minWidth: "100%",
      },
      selectEmpty: {
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
}));

const Add = ({ open, setOpen,setData }) => {

      const classes = useStyles();
      
      const isLogged = useSelector(state=> state.loggedReducer)

      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

      const handleClose = () => {
            setOpen(false);
      };

      const [info,setInfo] = useState({
            jobs:[],
            cities:[],

      })

      useEffect(()=>{
            const init = async ()=>{
                  const resJobs = await JobService.getAll()
                  const resCities = await CityService.getAll()

                  setInfo({jobs:resJobs,cities:resCities.data})

            }

            init()
      },[])

      return (
            <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
            >
                  <DialogTitle id="responsive-dialog-title">{"İş İlanı Ekle"}</DialogTitle>
                  <DialogContent>
                        <Formik
                              initialValues={{
                                    jobId: '',
                                    type:'FullTime',
                                    cityId:'',
                                    remote:'Evet',
                                    salaryMin:'',
                                    salaryMax:'',
                                    openPositionCount:'',
                                    description:'',
                                    deadline:''
                              }}
                              validationSchema={Schema}
                              onSubmit={async values => {
                                    const res = await JobAdvertService.add({
                                          userId: Number(isLogged.id),
                                          cityId: Number(values.cityId),
                                          jobId:values.jobId,
                                          fullTime:(values.type === 'FullTime'?true:false),
                                          remote:(values.remote === 'Evet'?true:false),
                                          salaryMin:Number(values.salaryMin),
                                          salaryMax:Number(values.salaryMax),
                                          openPositionCount:Number(values.openPositionCount),
                                          deadline:values.deadline,
                                          description:values.description
                                    })
                                    if(res.success){
                                          const ress = await JobAdvertService.getByEmployer(isLogged.id)
                                          setData(ress.data)
                                          setOpen(false);
                                    }
                                    
                              }}
                        >
                              {({ values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit
                              }) => (
                                    <Form onSubmit={handleSubmit} style={{minWidth:"500px"}}>
                                          <Form.Group>
                                                <FormControl variant="outlined" className={classes.formControl +" mb-3"}>
                                                      <InputLabel id="namelab">İş İsmi</InputLabel>
                                                      <Select
                                                      labelId="namelab"
                                                      native
                                                      id="jobId"
                                                      name="jobId"
                                                      value={values.jobId}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      label="İş İsmi"
                                                      >
                                                      <option aria-label="None" value="" />
                                                      {info.jobs.map(item=>(
                                                      <option value={item.jobId}>{item.title}</option> 
                                                      ))}
                                                      </Select>
                                                      {errors.jobId && touched.jobId && (
                                                            <Form.Text className="text-danger">{errors.jobId}</Form.Text>
                                                      )}
                                                </FormControl>
                                          </Form.Group>
                                          <Form.Group>
                                                <Form.Label>Açık Pozisyon Sayısı</Form.Label>
                                                <Form.Control 
                                                id="openPositionCount"
                                                placeholder="Açık Pozisyon Sayısı" 
                                                type="text"
                                                value={values.openPositionCount}
                                                onChange={handleChange}
                                                onBlur={handleBlur}/>
                                                {errors.openPositionCount && touched.openPositionCount && (
                                                      <Form.Text className="text-danger">{errors.openPositionCount}</Form.Text>
                                                )}
                                          </Form.Group>
                                          <Form.Group>
                                                <Form.Label>Minimum Ücret</Form.Label>
                                                <Form.Control 
                                                id="salaryMin"
                                                placeholder="Minimum Ücret" 
                                                type="text"
                                                value={values.salaryMin}
                                                onChange={handleChange}
                                                onBlur={handleBlur}/>
                                                {errors.salaryMin && touched.salaryMin && (
                                                      <Form.Text className="text-danger">{errors.salaryMin}</Form.Text>
                                                )}
                                          </Form.Group>
                                          <Form.Group>
                                                <Form.Label>Maximum Ücret</Form.Label>
                                                <Form.Control 
                                                id="salaryMax"
                                                placeholder="Maximum Ücret" 
                                                type="text"
                                                value={values.salaryMax}
                                                onChange={handleChange}
                                                onBlur={handleBlur}/>
                                                {errors.salaryMax && touched.salaryMax && (
                                                      <Form.Text className="text-danger">{errors.salaryMax}</Form.Text>
                                                )}
                                          </Form.Group>
                                          <Form.Group>
                                                <FormControl component="fieldset">
                                                      <FormLabel component="legend">Çalışma Türü</FormLabel>
                                                      <RadioGroup aria-label="gender" id="type" name="type" value={values.type} onChange={handleChange}>
                                                            <FormControlLabel value='FullTime' control={<Radio />} label="Tam Zamanlı" />
                                                            <FormControlLabel value='PartTime' control={<Radio />} label="Yarı Zamanlı" />
                                                      </RadioGroup>
                                                </FormControl>
                                          </Form.Group>
                                          <Form.Group>
                                                <FormControl component="fieldset">
                                                      <FormLabel component="legend">Remote</FormLabel>
                                                      <RadioGroup aria-label="gender" id="remote" name="remote" value={values.remote} onChange={handleChange}>
                                                            <FormControlLabel value='Evet' control={<Radio />} label="Evet" />
                                                            <FormControlLabel value='Hayır' control={<Radio />} label="Hayır" />
                                                      </RadioGroup>
                                                </FormControl>
                                          </Form.Group>
                                          <Form.Group>
                                                <FormControl variant="outlined" className={classes.formControl +" mb-3"}>
                                                      <InputLabel id="citylab">Şehir</InputLabel>
                                                      <Select
                                                      labelId="citylab"
                                                      native
                                                      id="cityId"
                                                      name="cityId"
                                                      value={values.cityId}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      label="Şehir"
                                                      >
                                                      <option aria-label="None" value="" />
                                                      {info.cities.map(item=>(
                                                      <option value={item.cityId} >{item.name}</option> 
                                                      ))}
                                                      </Select>
                                                      {errors.cityId && touched.cityId && (
                                                            <Form.Text className="text-danger">{errors.cityId}</Form.Text>
                                                      )}
                                                </FormControl>
                                          </Form.Group>
                                          
                                          <Form.Group>
                                                <Form.Label>İş Tanımı</Form.Label>
                                                <Form.Control 
                                                id="description"
                                                placeholder="İş Tanımı" 
                                                as="textarea" rows={3}
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}/>
                                                {errors.description && touched.description && (
                                                      <Form.Text className="text-danger">{errors.description}</Form.Text>
                                                )}
                                          </Form.Group>
                                          <Form.Group>
                                                <TextField
                                                      id="deadline"
                                                      label="İlan Bitiş Tarihi"
                                                      type="date"
                                                      value={values.deadline}
                                                      className={classes.textField}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                                />
                                                {errors.deadline && touched.deadline && (
                                                            <Form.Text className="text-danger">{errors.deadline}</Form.Text>
                                                )}
                                          </Form.Group>
                                          
                                          <DialogActions>
                                                <Button autoFocus type="submit" color="primary" disabled={isSubmitting}>
                                                      Ekle
                                                </Button>
                                                <Button onClick={handleClose} color="primary" autoFocus>
                                                      Çıkış
                                                </Button>
                                          </DialogActions>
                                    </Form>)}
                        </Formik>
                  </DialogContent>
                  
            </Dialog>
      );
}

export default React.memo(Add)