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


const Schema = Yup.object().shape({
      name: Yup.string()
            .min(2, 'Çok Kısa!')
            .max(50, 'Çok Uzun!')
            .required('Doldurmak Zorunlu!'),
      departmant: Yup.string()
            .min(2, 'Çok Kısa!')
            .max(50, 'Çok Uzun!')
            .required('Doldurmak Zorunlu!'),
      start_year: Yup.number()
            .typeError('Başlama Yılı Sayı Olmalı!')
            .required('Doldurmak Zorunlu!')
            .integer('Tam Sayı Olmak!')
            .min(1900, "1900'den küçük olamaz!")
            .max(2030, "2030'den büyük olamaz!"),
      graduated_year: Yup.number()
            .typeError("Mezuniyet Yılı Sayı olmalı")
            .integer('Tam Sayı Olmak!')
            .min(1900, "1900'den küçük olamaz!")
            .max(2030, "2030'den büyük olamaz!"),
});


const Add = ({ open, setOpen }) => {
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
                  <DialogTitle id="responsive-dialog-title">{"Okul Ekle"}</DialogTitle>
                  <DialogContent>
                        <Formik
                              initialValues={{
                                    name: '',
                                    departmant: '',
                                    start_year: '',
                                    graduated_year: ''
                              }}
                              validationSchema={Schema}
                              onSubmit={async values => {
                                    await new Promise(resolve => setTimeout(resolve, 500));
                                    alert(JSON.stringify(values, null, 2));
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
                                                      id="name"
                                                      placeholder="Okul İsmi"
                                                      type="text"
                                                      value={values.name}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.name && touched.name && (
                                                      <Form.Text className="text-danger">{errors.name}</Form.Text>
                                                )}

                                          </Form.Group>
                                          <Form.Group >
                                                <Form.Label>Departman</Form.Label>
                                                <Form.Control
                                                      id="departmant"
                                                      placeholder="Departman"
                                                      type="text"
                                                      value={values.departmant}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.departmant && touched.departmant && (
                                                      <Form.Text className="text-danger">{errors.departmant}</Form.Text>
                                                )}

                                          </Form.Group>
                                          <Form.Group >
                                                <Form.Label>Başlama Yılı</Form.Label>
                                                <Form.Control
                                                      id="start_year"
                                                      placeholder="Başlama Yılı"
                                                      type="text"
                                                      value={values.start_year}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.start_year && touched.start_year && (
                                                      <Form.Text className="text-danger">{errors.start_year}</Form.Text>
                                                )}

                                          </Form.Group>
                                          <Form.Group >
                                                <Form.Label>Mezuniyet Yılı</Form.Label>
                                                <Form.Control
                                                      id="graduated_year"
                                                      type="text"
                                                      placeholder="Mezuniyet Yılı (Boş Geçilebilir)"
                                                      value={values.graduated_year}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.graduated_year && touched.graduated_year && (
                                                      <Form.Text className="text-danger">{errors.graduated_year}</Form.Text>
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