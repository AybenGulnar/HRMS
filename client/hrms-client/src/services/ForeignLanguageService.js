import axios from "axios"

const url = "http://localhost:4000/api/foreignlanguages/"

const add = async (language)=>{
      const res = await axios.post(url+"add",language)

      return res.data
}

const updateForeignLanguage = async (id,name,level)=>{
      const res = await axios.post(url+"updateForeignLanguage?name="+name+"&level="+level+"&id="+id)

      return res.data
}

const deleteForeignLanguage = async (id)=>{
      const res = await axios.post(url+"deleteForeignLanguage?id="+id)

      return res.data
}


const service = {add,updateForeignLanguage,deleteForeignLanguage}

export default service