import axios from "axios"

const url = "http://localhost:4000/api/jobsekkers/"


const getAll = async ()=>{
      const res = await axios.get(url+"getall")

      return res.data
}

const getById = async (id)=>{
      const res = await axios.get(url+"getById?id="+id)

      return res.data
}

const register = async (job_seeker)=>{
      const res = await axios.post(url+"register")

      return res.data
}

const login = async (email,password)=>{
      const res = await axios.post(url+"login",{email:email,password:password})

      return res.data
}

const getExperiencesByUserId = async (id)=>{
      const res = await axios.get(url+"getExperiencesByUserId?id="+id)

      return res.data
}

const getSchoolsByUserId = async (id) =>{
      const res = await axios.get(url+"getSchoolsByUserId?id="+id)

      return res.data
}

const getForeignLanguagesByUserId = async (id)=>{
      const res = await axios.get(url+"getForeignLanguagesByUserId?id="+id)

      return res.data
}

const getSkillsByUserId = async (id)=>{
      const res = await axios.get(url+"getSkillsByUserId?id="+id)

      return res.data
}

const uploadImage = async (id,imgFile)=>{
      const res = await axios.post(url+"uploadimage",{id,imgFile})

      return res.data
}

const service = {getAll,getById,register,login,getExperiencesByUserId,getSchoolsByUserId,getForeignLanguagesByUserId,getSkillsByUserId,uploadImage}


export default service