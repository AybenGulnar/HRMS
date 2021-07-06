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
                        <div className={styles.job}>
                              <Container>
                                    <Row>
                                          <Col lg={8}>
                                          <div className={styles.job_element + " d-flex justify-content-between"}>
                                                <div className="d-flex align-items-center">
                                                      <div className={styles.thumb}>
                                                            <img src="https://technext.github.io/job-board-2/img/svg_icon/1.svg" alt=""/>
                                                      </div>
                                                      <div className={styles.content + " float-left"} >
                                                            <a href="/"><h4>{data.job.title}</h4></a>
                                                            <div className="d-flex align-items-center">
                                                            <div className="mr-5">
                                                                  <p><i className="fa fa-map-marker mr-1"></i> {data.city.name}</p>
                                                            </div>
                                                            <div className="mr-5">
                                                                  <p><i className="fa fa-clock-o mr-1"></i> {data.fullTime ? "Tam Zamanlı":"Yarı Zamanlı"}</p>
                                                            </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                          <div className={styles.desc}>
                                                <div>
                                                      <h4>İlan Açıklama</h4>
                                                      <p>{data.description}</p>
                                                </div>
                                          </div>
                                          </Col>
                                          <Col lg={4}>
                                                <div className={styles.job_sumary}>
                                                      <div>
                                                            <h3>İş Özellikleri</h3>
                                                      </div>
                                                      <div>
                                                            <ul>
                                                                  <li>Açık Pozisyon Sayısı: <span>{data.openPositionCount}</span></li>
                                                                  <li>Maaş Aralığı: <span>{data.salaryMin} - {data.salaryMax}</span></li>
                                                                  <li>Yayınlanma Tarihi: <span>{new Date(data.publishingDate).toDateString()}</span></li>
                                                                  <li>İlan Bitiş Tarihi: <span>{new Date(data.deadline).toDateString()}</span></li>
                                                                  <li>Remote: <span>{data.remote ? "Evet": "Hayır"}</span></li>
                                                                  <li>Şirket İsmi: <span> {data.employer.companyName}</span></li>
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