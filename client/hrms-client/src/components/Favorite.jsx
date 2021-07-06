import React from "react"
import { useHistory } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"

import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';

//Actions
import FavAction from "../store/actions/Fav"

const Favorite = ({openFav,anchorFavRef,handleCloseFav,handleListKeyDown})=>{

      const history = useHistory();
      const dispatch = useDispatch()

      const Favs = useSelector(state=> state.favReducer)

      const DelFav = (id)=>{
            dispatch(FavAction.DEL(id))
      }

      const goAdvert = (id)=>{
            history.push("/is-ilanlari/"+id)
      }

      return(
            <Popper open={openFav} anchorEl={anchorFavRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                              <Grow
                              {...TransitionProps}
                              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                              >
                              <Paper>
                              <ClickAwayListener onClickAway={handleCloseFav}>
                                    <MenuList autoFocusItem={openFav} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                          {!Favs.length && <div className="fav-item">Favoriler Bulunamadı!</div>}
                                          {Favs.map(item=>(
                                                <div className="fav-item"><span onClick={()=>goAdvert(item.id)}>{item.name}</span> <i className="fas fa-trash" onClick={()=>DelFav(item.id)}></i></div>
                                          ))}
                                    </MenuList>
                              </ClickAwayListener>
                              </Paper>
                              </Grow>
                        )}
            </Popper>
      )
}


export default Favorite