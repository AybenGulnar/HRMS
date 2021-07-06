import React, { useEffect, useState } from "react"
import {Form,Button} from "react-bootstrap"
import { Formik } from 'formik';
import * as Yup from "yup";
import {useSelector} from "react-redux"
import { ToastContainer, toast } from 'react-toastify';

//Services
import EmployerService from "../../services/EmployerService"
 
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

      const isLogged = useSelector(state=> state.loggedReducer)

      const [data,setData] = useState({
            load:false,
            isim:'',
            soyisim:'',
            dogumYili:0,
            companyName:'',
            phone_number:'',
            website:'',
            updated:false
            })

      useEffect(()=>{
            const init = async () => {
                  const res = await EmployerService.getById(isLogged.id)
                  if(res.data.updated){
                        setData({
                              load:true,
                              isim:res.data.firstName,
                              soyisim:res.data.lastName,
                              dogumYili:res.data.yearOfBirth,
                              companyName:res.data.companyName,
                              phone_number:res.data.phoneNumber,
                              website:res.data.website,
                              updated:res.data.updated
                        })
                  }
                  else{
                        setData({
                              load:true,
                              isim:res.data.ufirstName,
                              soyisim:res.data.ulastName,
                              dogumYili:res.data.uyearOfBirth,
                              companyName:res.data.ucompanyName,
                              phone_number:res.data.uphoneNumber,
                              website:res.data.uwebsite,
                              updated:res.data.updated
                        })
                  }
                  
            }
            init()
      },[isLogged])

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
                        companyName:data.companyName,
                        phone_number:data.phone_number,
                        website:data.website
                        }}
                        validationSchema={Schema}
                        onSubmit={async values => {
                              const res = await EmployerService.updateEmployer(isLogged.id,values.isim,values.soyisim,values.dogumYili,values.companyName,values.phone_number,values.website)
                              if(res.success){
                                    setData(prevValue=>({
                                          ...prevValue,
                                          updated:res.data.updated
                                    }))
                                    toast.success("Güncelleme isteği gönderildi...")
                              }
                              else{
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
                              <ToastContainer/>
                              <h2 className="float-right text-muted">{data.updated?"Güncel":"Güncellenmesi Bekleniyor"}</h2>
                              <div className="py-3"/>
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
                                    <Form.Label>Şirket İsmi</Form.Label>
                                    <Form.Control 
                                    id="companyName"
                                    type="text"
                                    value={values.companyName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}/>
                                    
                              </Form.Group>
                              <Form.Group >
                                    <Form.Label>Telefon Numarası</Form.Label>
                                    <Form.Control 
                                    id="phone_number"
                                    type="text"
                                    value={values.phone_number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}/>
                                    
                              </Form.Group>
                              <Form.Group >
                                    <Form.Label>Websitesi</Form.Label>
                                    <Form.Control 
                                    id="website"
                                    type="text"
                                    value={values.website}
                                    onChange={handleChange}
                                    onBlur={handleBlur}/>
                                    
                              </Form.Group>
                              <Button variant="primary" type="submit" disabled={isSubmitting || !data.updated}>
                                    Kaydet
                              </Button>
                        </Form>)}
                   </Formik>
                   )
      }
}

export default React.memo(Main)