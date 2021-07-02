import axios from "axios"

const url = "http://localhost:4000/api/jobs/"

const getAll = async ()=>{
      const res = await axios.get(url+"getall")

      return res.data
}


const add = async (job)=>{
      const res = await axios.post(url+"add",job)

      return res.data
}


const service = {getAll,add}

export default service