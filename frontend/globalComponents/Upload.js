import React, {useCallback} from "react"
import {useDropzone} from "react-dropzone"
import Api from "../API/uploadAPI"; 
 
// https://gitlab.com/meno/dropzone
// https://react-dropzone.js.org/

const Upload = () => {
  let uploadImage = function(){
    Api.uploadImage({image: document.getElementById("imageFiles").files[0] }, 
    ()=>{}, 
    ()=>{})
  }
  
  let uploadAlbum = function(){
  }
  
  let uploadAvatar = function(){
  }
  
  return (
    <div>
      <form action="/upload/productImage" method="POST" encType="multipart/form-data">
        <div>
          <div>
            <span>File</span>
            <input id = "imageFiles" name="myImage" type="file"/>
          </div>
          <div>
            <input type="text"/>
          </div>
        </div>
        <button type="submit" onClick = {(e)=>{e.preventDefault(); uploadImage(e)}}>Submit</button>
      </form>
    </div>
  )
}
 
Upload.displayName = "Upload";

export default Upload;
