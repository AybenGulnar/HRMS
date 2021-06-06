import axios from "axios"

const url = "http://localhost:4000/api/employers/"


const getAll = async ()=>{
      const res = await axios.get(url+"getall")

      return res.data
}

const register = async (employer)=>{
      const res = await axios.post(url+"register",employer)

      return res.data
}


const service = {getAll,register}

export default service