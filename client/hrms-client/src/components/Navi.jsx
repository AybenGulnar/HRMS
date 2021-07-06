import React,{useState,useEffect} from "react"
import { useHistory } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"

import styles from "../styles/Navi.module.css"

import { Container, Navbar } from "react-bootstrap"
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';

//Components
import Favorite from "../Components/Favorite"

//Actions
import AuthAction from "../store/actions/isLogged"

const Navi = ()=>{

      const history = useHistory();
      const dispatch = useDispatch()

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

      const [openFav, setOpenFav] = React.useState(false);
      const anchorFavRef = React.useRef(null);

      const handleToggleFav = () => {
            setOpenFav((prevOpen) => !prevOpen);
      };

      const handleCloseFav = (event) => {
            if (anchorFavRef.current && anchorFavRef.current.contains(event.target)) {
                  return;
            }

            setOpenFav(false);
      };

      const [scrollY, setScrollY] = useState(0);

      function logit() {
            setScrollY(window.pageYOffset);
      }

      useEffect(() => {
            function watchScroll() {
                  window.addEventListener("scroll", logit);
            }
            watchScroll();
            return () => {
                  window.removeEventListener("scroll", logit);
            };
      });

      

      function handleListKeyDown(event) {
            if (event.key === 'Tab') {
                  event.preventDefault();
                  setOpen(false);
                  setOpenFav(false);
            }
      }
      
      const isLogged = useSelector(state=> state.loggedReducer)

      const goProfil = ()=>{
            if(isLogged.isEmployer){
                  history.push("/firma/"+isLogged.id)
            }
            else{
                  history.push("/aday/"+isLogged.id) 
            }
      }

      const goAdverts = ()=>{
            history.push("/firma/ilanlarım")
      }

      const goSettings = ()=>{
            if(isLogged.isEmployer){
                  history.push("/firma/ayarlar")
            }
            else{
                  history.push("/aday/ayarlar") 
            }
      }



      const Logout = ()=>{
            setOpen(false);
            setTimeout(()=>{
                  dispatch(AuthAction.logout())
            },200)
            window.location.href = "/"
      }

      

      return( 
      <Navbar bg={scrollY > 70 && "secondary"} variant="dark" expand="lg" fixed="top" className={styles.navi}>
            <Container>
                  <Navbar.Brand className={styles.brand} style={{cursor:"pointer"}} onClick={()=>history.push("/")}>HRMS</Navbar.Brand>
                  
                  <div className={styles.buttons}>
                  {(isLogged.isLogged && !isLogged.isEmployer) && <div className={styles.fav} 
                              ref={anchorFavRef}
                              aria-controls={openFav ? 'menu-list-grow' : undefined}
                              aria-haspopup="true"
                              onClick={handleToggleFav}>
                                    <div>
                                          <i className="fa fa-heart"></i> Favoriler
                                    </div>
                              </div>} 
                        {isLogged.isLogged ? <div className={styles.user} 
                              ref={anchorRef}
                              aria-controls={open ? 'menu-list-grow' : undefined}
                              aria-haspopup="true"
                              onClick={handleToggle}>
                                    <div className={styles.photo}>
                                          <img src={isLogged.imageUrl !== "" ? isLogged.imageUrl :"/profile.jpg"} alt=""/>
                                    </div>
                                    <div className={styles.name}>
                                          <div><span className="text-uppercase">{isLogged.name}</span></div>
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
                                          <MenuItem className="hover-bg-dark" onClick={goProfil}>Profil</MenuItem>
                                          {isLogged.isEmployer && <MenuItem className="hover-bg-dark" onClick={goAdverts}>İlanlarım</MenuItem>}
                                          <MenuItem className="hover-bg-dark" onClick={goSettings}>Ayarlar</MenuItem>
                                          <MenuItem className="hover-bg-dark" onClick={Logout}>Çıkış Yap</MenuItem>
                                    </MenuList>
                              </ClickAwayListener>
                              </Paper>
                              </Grow>
                        )}
            </Popper>
            <Favorite openFav={openFav} anchorFavRef={anchorFavRef} handleCloseFav={handleCloseFav} handleListKeyDown={handleListKeyDown} />
      </Navbar>)
}

export default Navi