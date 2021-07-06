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

const updateEmployer = async (id,firstName,lastName,yearOfBirth,companyName,phoneNumber,website)=>{
      const res = await axios.post(url+"updateEmployer?companyName="+companyName+"&firstName="+firstName+"&id="+id+"&lastName="+lastName+"&phoneNumber="+phoneNumber+"&website="+website+"&yearOfBirth="+yearOfBirth)

      return res.data
}

const updateEmployerUpdated = async (id,isUpdated)=>{
      const res = await axios.post(url+"updateEmployerUpdated?id="+id+"&isUpdated="+isUpdated)

      return res.data
}

const confirmEmail = async (id)=>{
      const res = await axios.post(url+"confirmemail?id="+id)

      return res.data
}

const service = {getAll,login,register,getById,updateEmployer,updateEmployerUpdated,confirmEmail}

export default service