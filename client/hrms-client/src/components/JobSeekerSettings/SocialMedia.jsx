import React, { useEffect, useState } from "react"
import {Form,Button} from "react-bootstrap"
import { Formik } from 'formik';


const SocialMedia = () => {

      const [data,setData] = useState({
            load:false,
            github:'',
            linkedin:''
            })

      useEffect(()=>{
            const init = async () => {
                  await new Promise(resolve => setTimeout(resolve, 500));
                  setData({
                        load:true,
                        github:'OmBayus',
                        linkedin:'Omer Bayramcavus'
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