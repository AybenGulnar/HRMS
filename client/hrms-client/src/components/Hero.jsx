import React from "react"
import Fade from "react-reveal/Fade"

const Hero = ({text})=>(
      <div className="hero">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                      <Fade left>
                        <h3>{text}</h3>
                      </Fade>
                </div>
            </div>
        </div>
    </div>
)

export default Hero