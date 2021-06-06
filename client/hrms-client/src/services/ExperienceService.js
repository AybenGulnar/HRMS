import axios from "axios"

const url = "http://localhost:4000/api/experiences/"

const add = async (experience)=>{
      const res = await axios.post(url+"add",experience)

      return res.data
}


const service = {add}

export default service