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
import SkillService from "../../../services/SkillService"

const Schema = Yup.object().shape({
      name: Yup.string()
            .min(2, 'Çok Kısa!')
            .max(50, 'Çok Uzun!')
            .required('Doldurmak Zorunlu!')
});


const Edit = ({ open, setOpen,skill,toast,init }) => {
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
                  <DialogTitle id="responsive-dialog-title">{"Beceri Düzenle"}</DialogTitle>
                  <DialogContent>
                        <Formik
                              initialValues={{
                                    name: skill.name
                              }}
                              validationSchema={Schema}
                              onSubmit={async values => {
                                    const res = await SkillService.updateSkill(skill.id,values.name)
                                    console.log(res)
                                    if(res.success){
                                          toast.success("Beceri Güncellendi...")
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