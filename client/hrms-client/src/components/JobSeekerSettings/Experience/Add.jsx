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
import ExperienceService from "../../../services/ExperienceService"


const Schema = Yup.object().shape({
      companyName: Yup.string()
            .min(2, 'Çok Kısa!')
            .max(50, 'Çok Uzun!')
            .required('Doldurmak Zorunlu!'),
      position: Yup.string()
            .min(2, 'Çok Kısa!')
            .max(50, 'Çok Uzun!')
            .required('Doldurmak Zorunlu!'),
      startYear: Yup.number()
            .typeError('Başlama Yılı Sayı Olmalı!')
            .required('Doldurmak Zorunlu!')
            .integer('Tam Sayı Olmak!')
            .min(1900, "1900'den küçük olamaz!")
            .max(2030, "2030'den büyük olamaz!"),
      leaveYear: Yup.number()
            .typeError("Çıkış Yılı Sayı olmalı")
            .integer('Tam Sayı Olmak!')
            .min(1900, "1900'den küçük olamaz!")
            .max(2030, "2030'den büyük olamaz!"),
});


const Add = ({ open, setOpen,init,toast }) => {
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
                  <DialogTitle id="responsive-dialog-title">{"Tecrübe Ekle"}</DialogTitle>
                  <DialogContent>
                        <Formik
                              initialValues={{
                                    companyName: '',
                                    position: '',
                                    startYear: '',
                                    leaveYear: ''
                              }}
                              validationSchema={Schema}
                              onSubmit={async values => {
                                    const res = await ExperienceService.add(
                                          {
                                                companyName: values.companyName,
                                                position: values.position,
                                                startYear: values.startYear,
                                                leaveYear: values.leaveYear,
                                                jobSeeker:{
                                                      id:isLogged.id
                                                }
                                          }
                                    )
                                    if(res.success){
                                          toast.success("Tecrübe Eklendi...")
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
                                                <Form.Label>Şirket İsmi</Form.Label>
                                                <Form.Control
                                                      id="companyName"
                                                      placeholder="Şirket İsmi"
                                                      type="text"
                                                      value={values.companyName}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.companyName && touched.companyName && (
                                                      <Form.Text className="text-danger">{errors.companyName}</Form.Text>
                                                )}

                                          </Form.Group>
                                          <Form.Group >
                                                <Form.Label>Pozisyon</Form.Label>
                                                <Form.Control
                                                      id="position"
                                                      placeholder="Pozisyon"
                                                      type="text"
                                                      value={values.position}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.position && touched.position && (
                                                      <Form.Text className="text-danger">{errors.position}</Form.Text>
                                                )}

                                          </Form.Group>
                                          <Form.Group >
                                                <Form.Label>Başlama Yılı</Form.Label>
                                                <Form.Control
                                                      id="startYear"
                                                      placeholder="Başlama Yılı"
                                                      type="text"
                                                      value={values.startYear}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.startYear && touched.startYear && (
                                                      <Form.Text className="text-danger">{errors.startYear}</Form.Text>
                                                )}

                                          </Form.Group>
                                          <Form.Group >
                                                <Form.Label>Çıkış Yılı</Form.Label>
                                                <Form.Control
                                                      id="leaveYear"
                                                      type="text"
                                                      placeholder="Çıkış Yılı (Boş Geçilebilir)"
                                                      value={values.leaveYear}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.leaveYear && touched.leaveYear && (
                                                      <Form.Text className="text-danger">{errors.leaveYear}</Form.Text>
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