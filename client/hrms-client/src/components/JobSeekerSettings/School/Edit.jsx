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

//Services
import SchoolService from "../../../services/SchoolService"


const Schema = Yup.object().shape({
      schoolName: Yup.string()
            .min(2, 'Çok Kısa!')
            .max(50, 'Çok Uzun!')
            .required('Doldurmak Zorunlu!'),
      department: Yup.string()
            .min(2, 'Çok Kısa!')
            .max(50, 'Çok Uzun!')
            .required('Doldurmak Zorunlu!'),
      startYear: Yup.number()
            .typeError('Başlama Yılı Sayı Olmalı!')
            .required('Doldurmak Zorunlu!')
            .integer('Tam Sayı Olmak!')
            .min(1900, "1900'den küçük olamaz!")
            .max(2030, "2030'den büyük olamaz!"),
      graduatedYear: Yup.number()
            .typeError("Mezuniyet Yılı Sayı olmalı")
            .integer('Tam Sayı Olmak!')
            .min(1900, "1900'den küçük olamaz!")
            .max(2030, "2030'den büyük olamaz!"),
});


const Edit = ({ open, setOpen,school,init,toast }) => {
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                  <DialogTitle id="responsive-dialog-title">{"Okul Düzenle"}</DialogTitle>
                  <DialogContent>
                        <Formik
                              initialValues={{
                                    schoolName: school.schoolName,
                                    department: school.department,
                                    startYear: school.startYear,
                                    graduatedYear: school.graduatedYear
                              }}
                              validationSchema={Schema}
                              onSubmit={async values => {
                                    const res = await SchoolService.updateSchool(school.id,values.schoolName,values.department,values.startYear,values.graduatedYear)
                                    if(res.success){
                                          toast.success("Okul Güncellendi...")
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
                                                <Form.Label>Okul İsmi</Form.Label>
                                                <Form.Control
                                                      id="schoolName"
                                                      placeholder="Okul İsmi"
                                                      type="text"
                                                      value={values.schoolName}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.schoolName && touched.schoolName && (
                                                      <Form.Text className="text-danger">{errors.schoolName}</Form.Text>
                                                )}

                                          </Form.Group>
                                          <Form.Group >
                                                <Form.Label>Departman</Form.Label>
                                                <Form.Control
                                                      id="department"
                                                      placeholder="Departman"
                                                      type="text"
                                                      value={values.department}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.department && touched.department && (
                                                      <Form.Text className="text-danger">{errors.department}</Form.Text>
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
                                                <Form.Label>Mezuniyet Yılı</Form.Label>
                                                <Form.Control
                                                      id="graduatedYear"
                                                      type="text"
                                                      placeholder="Mezuniyet Yılı (Boş Geçilebilir)"
                                                      value={values.graduatedYear}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.graduatedYear && touched.graduatedYear && (
                                                      <Form.Text className="text-danger">{errors.graduatedYear}</Form.Text>
                                                )}
                                          </Form.Group>
                                          <DialogActions>
                                                <Button autoFocus type="submit" color="primary" disabled={isSubmitting}>
                                                      Kaydet
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

export default React.memo(Edit)