import React from "react"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Form } from "react-bootstrap"
import { Formik } from 'formik';
import * as Yup from "yup";
import {useSelector} from "react-redux"

//Services
import ForeignLanguageService from "../../../services/ForeignLanguageService"

const Schema = Yup.object().shape({
      name: Yup.string()
            .min(2, 'Çok Kısa!')
            .max(50, 'Çok Uzun!')
            .required('Doldurmak Zorunlu!'),
      level: Yup.number()
            .typeError('Seviye Sayı Olmalı!')
            .required('Doldurmak Zorunlu!')
            .integer('Tam Sayı Olmak!')
            .min(1, "1'den küçük olamaz!")
            .max(5, "5'den büyük olamaz!")
});


const Add = ({ open, setOpen,toast,init }) => {
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

      const isLogged = useSelector(state=> state.loggedReducer)

      const handleClose = () => {
            setOpen(false);
      };

      return (
            <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
            >
                  <DialogTitle id="responsive-dialog-title">{"Dil Ekle"}</DialogTitle>
                  <DialogContent>
                        <Formik
                              initialValues={{
                                    name: '',
                                    level: ''
                              }}
                              validationSchema={Schema}
                              onSubmit={async values => {
                                    const res = await ForeignLanguageService.add(
                                          {
                                                name: values.name,
                                                level: values.level,
                                                jobSeeker:{
                                                      id:isLogged.id
                                                }
                                          }
                                    )
                                    if(res.success){
                                          toast.success("Yabancı Dil Eklendi...")
                                          init()
                                          handleClose()
                                    }
                                    else{
                                          toast.error("Hata")
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
                                                <Form.Label>Dil</Form.Label>
                                                <Form.Control
                                                      id="name"
                                                      placeholder="Dil"
                                                      type="text"
                                                      value={values.name}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.name && touched.name && (
                                                      <Form.Text className="text-danger">{errors.name}</Form.Text>
                                                )}

                                          </Form.Group>
                                          <Form.Group >
                                                <Form.Label>Seviye</Form.Label>
                                                <Form.Control
                                                      id="level"
                                                      placeholder="Seviye"
                                                      type="text"
                                                      value={values.level}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.level && touched.level && (
                                                      <Form.Text className="text-danger">{errors.level}</Form.Text>
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