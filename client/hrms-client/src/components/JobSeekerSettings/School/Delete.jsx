import React from "react"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

//Services
import SchoolService from "../../../services/SchoolService"

const Delete = ({ open, setOpen,school,toast,init }) => {
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

      const handleClose = () => {
            setOpen(false);
      };

      const Sil= async()=>{
            const res = await SchoolService.deleteSchool(school.id)
            if(res.success){
                  toast.success("Okul Başarıyla Silindi...")
                  init()
                  handleClose()
            }
            else{
                  toast.error("Hata")
            }

            setOpen(false)
      }

      return (
            <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
            >
                  <DialogTitle id="responsive-dialog-title">{"Okul Sil"}</DialogTitle>
                  <DialogContent>
                        <h3>{school.name}</h3>
                  </DialogContent>
                  <DialogActions>
                        <Button onClick={handleClose} color="primary">
                              Çıkış
                        </Button>
                        <Button onClick={Sil} color="primary" autoFocus>
                              Sil
                        </Button>
                  </DialogActions>
                  
            </Dialog>
      );
}

export default React.memo(Delete)