import React, { useEffect, useState } from "react"
import {Form,Button} from "react-bootstrap"
import { Formik } from 'formik';
import * as Yup from "yup";
 
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
.min(1920,"1920'den küçük olamaz!")
.max(2020,"2020'den büyük olamaz!")

});

const Main = () => {

      const [data,setData] = useState({
            load:false,
            isim:'',
            soyisim:'',
            dogumYili:0,
            aciklama:''
            })

      useEffect(()=>{
            const init = async () => {
                  await new Promise(resolve => setTimeout(resolve, 500));
                  setData({
                        load:true,
                        isim:'Omer',
                        soyisim:'Bayramcavus',
                        dogumYili:2000,
                        aciklama:'akdnasdlnasdk'
                  })
            }
            init()
      },[])

      if(!data.load){
            return(<div>Lütfen Bekleyiniz..</div>)
      }
      else{
            return (
                  <Formik
                        initialValues={{
                        isim:data.isim,
                        soyisim:data.soyisim,
                        dogumYili:data.dogumYili,
                        aciklama:data.aciklama
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
                        <Form onSubmit={handleSubmit}>
                              <Form.Group >
                                    <Form.Label>Isim</Form.Label>
                                    <Form.Control 
                                    id="isim"
                                    placeholder="Isim" 
                                    type="text"
                                    value={values.isim}
                                    onChange={handleChange}
                                    onBlur={handleBlur}/>
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
                                    onBlur={handleBlur}/>
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
                                    onBlur={handleBlur}/>
                                    {errors.dogumYili && touched.dogumYili && (
                                          <Form.Text className="text-danger">{errors.dogumYili}</Form.Text>
                                    )}
                                    
                              </Form.Group>
                              <Form.Group >
                                    <Form.Label>Tanıtım Yazısı</Form.Label>
                                    <Form.Control 
                                    id="aciklama"
                                    as="textarea" rows={3}
                                    value={values.aciklama}
                                    onChange={handleChange}
                                    onBlur={handleBlur}/>
                                    
                              </Form.Group>
                              <Button variant="primary" type="submit" disabled={isSubmitting}>
                                    Kaydet
                              </Button>
                        </Form>)}
                   </Formik>
                   )
      }
}

export default React.memo(Main)