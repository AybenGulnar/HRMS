import axios from "axios"

const url = "http://localhost:4000/api/schools/"

const add = async (school)=>{
      const res = await axios.post(url+"add",school)

      return res.data
}

const updateSchool = async (id,schoolName,department,startYear,graduatedYear)=>{
      const res = await axios.post(url+"updateSchool?department="+department+"&graduatedYear="+graduatedYear+"&id="+id+"&schoolName="+schoolName+"&startYear="+startYear)

      return res.data
}

const deleteSchool = async (id)=>{
      const res = await axios.post(url+"deleteSchool?id="+id)

      return res.data
}


const service = {add,updateSchool,deleteSchool}

export default service