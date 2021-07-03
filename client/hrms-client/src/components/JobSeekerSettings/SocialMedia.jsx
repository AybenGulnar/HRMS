import React, { useEffect, useState } from "react"
import {Form,Button} from "react-bootstrap"
import { Formik } from 'formik';
import {useSelector} from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
//Services
import JobSeekerService from "../../services/JobSeekerService"

const SocialMedia = () => {

      const isLogged = useSelector(state=> state.loggedReducer)

      const [data,setData] = useState({
            load:false,
            github:'',
            linkedin:''
            })

      useEffect(()=>{
            const init = async () => {
                  const res = await JobSeekerService.getById(isLogged.id)
                  setData({
                        load:true,
                        github:res.data.github,
                        linkedin:res.data.linkedin
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
                        github:data.github,
                        linkedin:data.linkedin
                        }}
                        onSubmit={async values => {
                              const res = await JobSeekerService.updateSocialMedia(isLogged.id,values.github,values.linkedin)
                              if(res.success){
                                    toast.success("Bilgileriniz Güncellendi...")
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
                              <Form.Group >
                                    <Form.Label>Github</Form.Label>
                                    <Form.Control 
                                    id="github"
                                    placeholder="Github" 
                                    type="text"
                                    value={values.github}
                                    onChange={handleChange}
                                    onBlur={handleBlur}/>
                                    {errors.github && touched.github && (
                                          <Form.Text className="text-danger">{errors.github}</Form.Text>
                                    )}
                                    
                              </Form.Group>
                              <Form.Group >
                                    <Form.Label>Linkedin</Form.Label>
                                    <Form.Control 
                                    id="linkedin"
                                    placeholder="Linkedin" 
                                    type="text"
                                    value={values.linkedin}
                                    onChange={handleChange}
                                    onBlur={handleBlur}/>
                                    {errors.linkedin && touched.linkedin && (
                                          <Form.Text className="text-danger">{errors.linkedin}</Form.Text>
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

export default React.memo(SocialMedia)