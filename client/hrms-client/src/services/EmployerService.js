import axios from "axios"

const url = "http://localhost:4000/api/employers/"


const getAll = async ()=>{
      const res = await axios.get(url+"getall")

      return res.data
}

const getById = async (id)=>{
      const res = await axios.get(url+"getById?id="+id)

      return res.data
}

const register = async (employer)=>{
      const res = await axios.post(url+"register",employer)

      return res.data
}

const login = async (email,password)=>{
      const res = await axios.post(url+"login",{email,password})

      return res.data
}

const service = {getAll,login,register,getById}

export default service