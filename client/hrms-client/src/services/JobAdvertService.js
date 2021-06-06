import axios from "axios"

const url = "http://localhost:4000/api/jobadverts/"


const getAll = async ()=>{
      const res = await axios.get(url+"getall")

      return res.data
}

const getByActiveAndEmployer = async (active,id)=>{
      const res = await axios.get(url+"getbyactiveandemployer",{active,id})

      return res.data
}

const getByActived = async (active)=>{
      const res = await axios.get(url+"getbyactived",active)

      return res.data
}

const getByDate = async ()=>{
      const res = await axios.get(url+"getbydate")

      return res.data
}

const add = async (job_advert)=>{
      const res = await axios.post(url+"add",job_advert)

      return res.data
}


const service = {getAll,getByActiveAndEmployer,getByActived,getByDate,add}

export default service