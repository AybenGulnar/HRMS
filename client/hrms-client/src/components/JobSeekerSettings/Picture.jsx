import React,{useEffect,useState} from "react"
import {useSelector,useDispatch} from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import Dropzone from "react-dropzone";
import {Button} from "react-bootstrap"

import AuthAction from "../../store/actions/isLogged"
//Services
import JobSeekerService from "../../services/JobSeekerService"

const Picture = ()=>{

      const isLogged = useSelector(state=> state.loggedReducer)
      const dispatch = useDispatch()

      const [imgURL,setImgUrl] = useState({
            load:false,
            url:""
      })

      const [file,setFile] = useState([])

      useEffect(()=>{
            const init = async () => {
                  const res = await JobSeekerService.getById(isLogged.id)
                  if(res.success){
                        setImgUrl({
                              load:true,
                              url:res.data.imageUrl
                        })
                        document.getElementById("resim").setAttribute("src",res.data.imageUrl)
                  }  
            }
            init()
      },[isLogged])

      const handleDrop = acceptedFiles =>{

            var reader = new FileReader()
      
            reader.onload = function(e){
                  document.getElementById("resim").setAttribute("src",e.target.result)
            }
            reader.readAsDataURL(acceptedFiles[0]);
            setFile(acceptedFiles[0]);
      }

      const editPost = async(e)=>{
            e.preventDefault()

            const data = new FormData()
            data.append("multipartFile",file)

            const res = await JobSeekerService.uploadImage(isLogged.id,data)
            if(res.success){
                  dispatch(AuthAction.sigin(false,res.data.id,(res.data.firstName + " " +res.data.lastName),res.data.imageUrl))
                  toast.success("Resim Başarıyla Güncellendi")
            }
            else{
                  toast.error("Hata")
            }
      }

      if(!imgURL.load){
            return(<div>Lütfen Bekleyiniz..</div>)
      }

      return(
      <div>
            <ToastContainer/>
            <h4>Profil Resmi Ayarlayınız</h4>
            <img id="resim" src="#" alt="img" className="dropzone-img" />
            <Dropzone
            onDrop={handleDrop}
            accept="image/*"
            minSize={200}
            maxSize={3072000}
            >
            {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>Drag'n'drop images, or click to select files</p>
            </div>
            )}
            </Dropzone>

            <Button variant="primary" type="submit" onClick={editPost}>
                  Kaydet
            </Button>
      </div>)
}

export default Picture