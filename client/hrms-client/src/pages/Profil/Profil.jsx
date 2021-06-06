import React from "react"
import {useRouteMatch} from "react-router-dom"

const Profil = ()=>{

      const match = useRouteMatch("/:id").params.id

      return(
            <div>
                  Profil
            </div>
      )
}

export default Profil