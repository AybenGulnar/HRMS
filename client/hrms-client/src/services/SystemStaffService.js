import axios from "axios"

const url = "http://localhost:4000/api/systemstaffs/"

const add = async (systemStaff)=>{
      const res = await axios.post(url+"add",systemStaff)

      return res.data
}

const getById = async (id)=>{
      const res = await axios.get(url+"getById?id="+id)

      return res.data
}

const login = async (email,pass)=>{
      const res = await axios.post(url+"login?name="+email+"&pass="+pass)

      return res.data
}

const updateSystemStaff = async (id,firstName,lastName,yearOfBirth)=>{
      const res = await axios.post(url+"updateSystemStaff?firstName="+firstName+"&id="+id+"&lastName="+lastName+"&yearOfBirth="+yearOfBirth)

      return res.data
}


const service = {add,getById,login,updateSystemStaff}

export default service