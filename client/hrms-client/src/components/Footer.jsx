import React from "react"

import styles from "../styles/Footer.module.css"

const Footer = ()=>{
      return(<div className={styles.footer}>
            <div>
                  <div className={styles.brand}>HRMS</div>
                  <div className={styles.socail_links +" my-2"}>
                        <ul>
                              {/* eslint-disable */}
                              <li>
                                    <a target="_blank" href="https://www.youtube.com/channel/UCDrOMpnEjJ0tHqvHSWJ3iNA">
                                          <i className="fa fa-youtube"></i>
                                    </a>
                              </li>
                              <li>
                                    <a target="_blank" href="https://github.com/OmBayus">
                                          <i className="fa fa-github"></i>
                                    </a>
                              </li>
                              <li>
                                    <a target="_blank" href="https://twitter.com/Ombayus1">
                                          <i className="fa fa-twitter"></i>
                                    </a>
                              </li>
                              <li>
                                    <a target="_blank" href="https://www.instagram.com/omerbayramcavus/">
                                          <i className="fa fa-instagram"></i>
                                    </a>
                              </li>
                        </ul>
                  </div>
                  <p>
                        hrms@support.com <br/>
                        +90 873 672 6782
                        Ankara, Turkey
                  </p>
                  <p className={styles.copy}>Copyright ©2021 Bu Websitesi <a href="https://github.com/OmBayus">OmBayus</a> tarafından yapılmıştır.</p>
            </div>
      </div>)
}

export default Footer