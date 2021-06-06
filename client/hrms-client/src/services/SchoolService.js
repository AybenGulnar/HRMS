import axios from "axios"

const url = "http://localhost:4000/api/schools/"

const add = async (school)=>{
      const res = await axios.post(url+"add",school)

      return res.data
}


const service = {add}

export default service