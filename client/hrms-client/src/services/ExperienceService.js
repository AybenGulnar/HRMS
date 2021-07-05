import axios from "axios"

const url = "http://localhost:4000/api/experiences/"

const add = async (experience)=>{
      const res = await axios.post(url+"add",experience)

      return res.data
}

const updateExperience = async (id,companyName,position,startYear,leaveYear)=>{
      const res = await axios.post(url+"updateExperience?companyName="+companyName+"&position="+position+"&id="+id+"&leaveYear="+leaveYear+"&startYear="+startYear)

      return res.data
}

const deleteExperience = async (id)=>{
      const res = await axios.post(url+"deleteSchool?id="+id)

      return res.data
}


const service = {add,deleteExperience,updateExperience}

export default service