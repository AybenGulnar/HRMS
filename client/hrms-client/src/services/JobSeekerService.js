import axios from "axios"

const url = "http://localhost:4000/api/jobsekkers/"


const getAll = async ()=>{
      const res = await axios.get(url+"getall")

      return res.data
}

const register = async (job_seeker)=>{
      const res = await axios.post(url+"register")

      return res.data
}

const getExperiencesByUserId = async (id)=>{
      const res = await axios.get(url+"getexperiencesbyuserid",{id})

      return res.data
}

const getSchoolsByUserId = async (id) =>{
      const res = await axios.get(url+"getschoolsbyuserid",{id})

      return res.data
}

const uploadImage = async (id,imgFile)=>{
      const res = await axios.post(url+"uploadimage",{id,imgFile})

      return res.data
}

const service = {getAll,register,getExperiencesByUserId,getSchoolsByUserId,uploadImage}


export default service