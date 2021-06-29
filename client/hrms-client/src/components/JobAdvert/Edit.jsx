import React from "react"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Form } from "react-bootstrap"
import { Formik } from 'formik';
import * as Yup from "yup";


const Schema = Yup.object().shape({
      name: Yup.string()
            .min(2, 'Çok Kısa!')
            .max(50, 'Çok Uzun!')
            .required('Doldurmak Zorunlu!')
});


const Edit = ({ open, setOpen,jobAdvert }) => {
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

      const handleClose = () => {
            setOpen(false);
      };


      const [isFullTime, setFullTime] = React.useState(jobAdvert.isFullTime?"FullTime":"PartTime");

      const handleFullTime = (event) => {
            setFullTime(event.target.value)
      };

      return (
            <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
            >
                  <DialogTitle id="responsive-dialog-title">{"İş İlanı Düzenle"}</DialogTitle>
                  <DialogContent>
                        <Formik
                              initialValues={{
                                    name: jobAdvert.name
                              }}
                              validationSchema={Schema}
                              onSubmit={async values => {
                                    await new Promise(resolve => setTimeout(resolve, 500));
                                    alert(JSON.stringify({...values,isFullTime}, null, 2));
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
                                                <Form.Label>İş İsmi</Form.Label>
                                                <Form.Control
                                                      id="name"
                                                      placeholder="İş İsmi"
                                                      type="text"
                                                      value={values.name}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur} />
                                                {errors.name && touched.name && (
                                                      <Form.Text className="text-danger">{errors.name}</Form.Text>
                                                )}

                                          </Form.Group>
                                          <FormControl component="fieldset">
                                                <FormLabel component="legend">Çalışma Türü</FormLabel>
                                                <RadioGroup aria-label="gender" name="gender1" value={isFullTime} onChange={handleFullTime}>
                                                      <FormControlLabel value='FullTime' control={<Radio />} label="Tam Zamanlı" />
                                                      <FormControlLabel value='PartTime' control={<Radio />} label="Yarı Zamanlı" />
                                                </RadioGroup>
                                          </FormControl>
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