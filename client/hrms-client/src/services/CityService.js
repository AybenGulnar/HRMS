import axios from "axios"

const url = "http://localhost:4000/api/cities/"


const getAll = async ()=>{
      const res = await axios.get(url+"getall")

      return res.data
}

const add = async (city_name)=>{
      const res = await axios.post(url+"add",{name:city_name})

      return res.data
}


const service =  {getAll,add}

export default service