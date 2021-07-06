import axios from "axios"

const url = "http://localhost:4000/api/skills/"

const add = async (skill)=>{
      const res = await axios.post(url+"add",skill)

      return res.data
}

const updateSkill = async (id,name,level)=>{
      const res = await axios.post(url+"updateSkill?name="+name+"&id="+id)

      return res.data
}

const deleteSkill = async (id)=>{
      const res = await axios.post(url+"deleteSkill?id="+id)

      return res.data
}


const service = {add,updateSkill,deleteSkill}

export default service