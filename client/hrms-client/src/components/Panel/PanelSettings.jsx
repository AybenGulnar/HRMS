import React, { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Formik } from 'formik';
import * as Yup from "yup";
import { useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';

//Services
import SystemStaffService from "../../services/SystemStaffService"

const Schema = Yup.object().shape({
      isim: Yup.string()
            .min(2, 'Çok Kısa!')
            .max(30, 'Çok Uzun!')
            .required('Doldurmak Zorunlu!'),
      soyisim: Yup.string()
            .min(2, 'Çok Kısa!')
            .max(30, 'Çok Uzun!')
            .required('Doldurmak Zorunlu!'),
      dogumYili: Yup.number()
            .typeError('Doğum Yılı Sayı Olmalı!')
            .required('Doldurmak Zorunlu!')
            .integer('Tam Sayı Olmak!')
            .min(1920, "1920'den küçük olamaz!")
            .max(2020, "2020'den büyük olamaz!")

});

const PanelSettings = () => {

      const isLogged = useSelector(state => state.adminReducer)

      const [data, setData] = useState({
            load: false,
            isim: '',
            soyisim: '',
            dogumYili: 0
      })

      useEffect(() => {
            const init = async () => {
                  const res = await SystemStaffService.getById(isLogged.id)
                  console.log(isLogged)
                  console.log(res)
                  setData({
                        load: true,
                        isim: res.data.firstName,
                        soyisim: res.data.lastName,
                        dogumYili: res.data.yearOfBirth,
                  })

            }
            init()
      }, [isLogged])

      if (!data.load) {
            return (<div>Lütfen Bekleyiniz..</div>)
      }
      else {
            return (
                  <Formik
                        initialValues={{
                              isim: data.isim,
                              soyisim: data.soyisim,
                              dogumYili: data.dogumYili,
                        }}
                        validationSchema={Schema}
                        onSubmit={async values => {
                              const res = await SystemStaffService.updateSystemStaff(isLogged.id,values.isim,values.soyisim,values.dogumYili)
                              if (res.success) {
                                    toast.success("Bilgiler Güncellendi...")
                              }
                              else {
                                    toast.error(res.message)
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
                              <Form onSubmit={handleSubmit}>
                                    <ToastContainer />
                                    <div className="py-3" />
                                    <Form.Group >
                                          <Form.Label>Isim</Form.Label>
                                          <Form.Control
                                                id="isim"
                                                placeholder="Isim"
                                                type="text"
                                                value={values.isim}
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                          {errors.isim && touched.isim && (
                                                <Form.Text className="text-danger">{errors.isim}</Form.Text>
                                          )}

                                    </Form.Group>
                                    <Form.Group >
                                          <Form.Label>Soyisim</Form.Label>
                                          <Form.Control
                                                id="soyisim"
                                                placeholder="Soyisim"
                                                type="text"
                                                value={values.soyisim}
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                          {errors.soyisim && touched.soyisim && (
                                                <Form.Text className="text-danger">{errors.soyisim}</Form.Text>
                                          )}

                                    </Form.Group>
                                    <Form.Group >
                                          <Form.Label>Doğum Yılı</Form.Label>
                                          <Form.Control
                                                id="dogumYili"
                                                placeholder="Doğum Yılı"
                                                type="text"
                                                value={values.dogumYili}
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                          {errors.dogumYili && touched.dogumYili && (
                                                <Form.Text className="text-danger">{errors.dogumYili}</Form.Text>
                                          )}

                                    </Form.Group>
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                                          Kaydet
                                    </Button>
                              </Form>)}
                  </Formik>
            )
      }
}

export default React.memo(PanelSettings)