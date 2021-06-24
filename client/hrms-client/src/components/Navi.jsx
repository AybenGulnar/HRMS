import React,{useState} from "react"
import { useHistory } from "react-router-dom";

import styles from "../styles/Navi.module.css"

import { Container, Navbar } from "react-bootstrap"
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';

const Navi = ()=>{

      const history = useHistory();
      const [open, setOpen] = React.useState(false);
      const anchorRef = React.useRef(null);

      const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
      };

      const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                  return;
            }

            setOpen(false);
      };

      function handleListKeyDown(event) {
            if (event.key === 'Tab') {
                  event.preventDefault();
                  setOpen(false);
            }
      }
      
      const [isLogged,setLogged] = useState({is:false,isEmployer:false})

      const goProfil = ()=>{

      }

      const goSettings = ()=>{

      }

      const Logout = ()=>{

      }

      

      return( 
      <Navbar variant="dark" expand="lg" fixed="top" className={styles.navi}>
            <Container>
                  <Navbar.Brand href="/" className={styles.brand}>HRMS</Navbar.Brand>
                  
                  <div className={styles.buttons}>
                        {isLogged.is ? <div className={styles.user} 
                              ref={anchorRef}
                              aria-controls={open ? 'menu-list-grow' : undefined}
                              aria-haspopup="true"
                              onClick={handleToggle}>
                                    <div className={styles.photo}>
                                          <img src="https://cdn.kariyer.net/Website/Images/profile.jpg" alt=""/>
                                    </div>
                                    <div className={styles.name}>
                                          <div><span>Ömer Bayramçavuş</span></div>
                                    </div>
                              </div>:<><button className={styles.btnlog + " mr-2"} onClick={()=>history.push("/aday/giris")}>Login</button>
                        <button className={styles.btn} onClick={()=>history.push("/firma/giris")}>İlan Yayınla</button></>}
                        
                        
                  </div>  
            </Container>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                              <Grow
                              {...TransitionProps}
                              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                              >
                              <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={goProfil}>Profil</MenuItem>
                                    <MenuItem onClick={goSettings}>Ayarlar</MenuItem>
                                    <MenuItem onClick={Logout}>Çıkış Yap</MenuItem>
                                    </MenuList>
                              </ClickAwayListener>
                              </Paper>
                              </Grow>
                        )}
            </Popper>
      </Navbar>)
}

export default Navi