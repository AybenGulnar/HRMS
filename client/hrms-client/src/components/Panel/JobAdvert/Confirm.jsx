import React from "react"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import JobAdvertService from "../../../services/JobAdvertService"

const Delete = ({ open, setOpen,select,setData,setfilteredData }) => {
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

      const handleClose = () => {
            setOpen(false);
      };

      const Onayla= async()=>{

            const res = await JobAdvertService.changeActive(select.jobAdvertId,!select.actived)

            if(res.success){
                  console.log(res)
                  setData(prevValue=>prevValue.map(item=>{
                        if(item.jobAdvertId === select.jobAdvertId){
                              return {...item,actived:!item.actived}
                        }
                        else{
                              return item
                        }
                  }))
                  setfilteredData(prevValue=>prevValue.map(item=>{
                        if(item.jobAdvertId === select.jobAdvertId){
                              return {...item,actived:!item.actived}
                        }
                        else{
                              return item
                        }
                  }))
                  setOpen(false)
            }
      }

      return (
            <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
            >
                  <DialogTitle id="responsive-dialog-title">{"Aktiflik Değiştir"}</DialogTitle>
                  <DialogContent>
                        <h3>İş İsmi: {select.job.title}</h3>
                        <h5>Aktif: {select.actived ? "Aktif" : "Aktif Değil"}</h5>
                  </DialogContent>
                  <DialogActions>
                        <Button onClick={handleClose} color="primary">
                              Çıkış
                        </Button>
                        <Button onClick={Onayla} color="primary" autoFocus>
                              Onayla
                        </Button>
                  </DialogActions>
                  
            </Dialog>
      );
}

export default React.memo(Delete)