import React from "react"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {Container,Col,Row} from "react-bootstrap"

import styles from "../../../styles/Job.module.css"


const Detail = ({ open, setOpen,data }) => {

      const handleClose = () => {
            setOpen(false);
      };

      return (
            <Dialog
                  fullScreen={true}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
            >
                  <DialogTitle id="responsive-dialog-title">{"İş İlanı"}</DialogTitle>
                  <DialogContent>
                  <div className={styles.Employer}>
                              <Container>
                                    <Row>
                                          <Col lg={8}>
                                                <div className={styles.Employer_element + " d-flex justify-content-between"}>
                                                      <div className="d-flex align-items-center">
                                                            <div className={styles.thumb}>
                                                                  <img src="https://technext.github.io/job-board-2/img/svg_icon/1.svg" alt="" />
                                                            </div>
                                                            <div className={styles.content + " float-left"} >
                                                                  <h4>{data.ucompanyName}</h4>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className={styles.desc}>
                                                      <div className="mb-5">
                                                            <h4>Şirket İletişim</h4>
                                                            <p>Telefon Numarası: <span>{data.uphoneNumber}</span></p>
                                                            {/* eslint-disable */}
                                                            <p>Websitesi: <span><a href={"https://"+data.uwebsite} target="_blank">{data.uwebsite}</a></span></p>
                                                      </div>
                                                </div>
                                          </Col>
                                          <Col lg={4}>
                                                <div className={styles.Employer_sumary}>
                                                      <div>
                                                            <h3>İş Veren Bilgileri</h3>
                                                      </div>
                                                      <div>
                                                            <ul>
                                                                  <li>Ad: <span>{data.ufirstName}</span></li>
                                                                  <li>Soyad: <span>{data.ulastName}</span></li>
                                                                  <li>Eposta: <span>{data.eposta}</span></li>
                                                            </ul>
                                                      </div>
                                                </div>
                                          </Col>
                                    </Row>
                              </Container>
                        </div>
                  </DialogContent>
                  <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                              Çıkış
                        </Button>
                  </DialogActions>
                  
            </Dialog>
      );
}

export default React.memo(Detail)