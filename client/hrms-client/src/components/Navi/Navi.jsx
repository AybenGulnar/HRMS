import React,{useState} from "react"
import { useHistory } from "react-router-dom";

import { Container, Navbar, Nav } from "react-bootstrap"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Navi = () => {

      const [isLogin,setIsLogin] = useState(false);
      const [anchorEl, setAnchorEl] = useState(null);

      const history = useHistory();

      const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
            setAnchorEl(null);
      };

      return (
            <Navbar bg="light" expand="lg">
                  <Container>
                        <Navbar.Brand href="/">HRMS</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="ml-auto">
                              {isLogin ? 
                                    <div>
                                          <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                                <AccountCircleIcon/>
                                          </Button>
                                          <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                          >
                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                                          </Menu>
                                    </div>:
                                    <div>
                                          <Button variant="contained" color="primary" onClick={()=>history.push("/auth")} className="mr-3">Giriş Yap / Kayıt Ol</Button>
                                    </div>
                              }
                              </Nav>
                        </Navbar.Collapse>
                  </Container>
            </Navbar>
      )
}


export default Navi