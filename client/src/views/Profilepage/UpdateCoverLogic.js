import axios from "axios";
import Cookies from "js-cookie";
import React from "react";

function UpdateCoverLogic({ setCoverPhoto, coverPhoto, setCoverModal, toast}) {
  const handleClick = () => {
    setCoverPhoto(null);
  };

  const handleChange = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = async () => setCoverPhoto(reader.result);    
  };

  const updateCoverPicture = async () => {

    if (!coverPhoto) {
      return toast("Choose a photo to update your cover", {
        type: "warning",
      });
    }
    if (!coverPhoto.includes("image")) {
      return toast("PNG/JPG extension only", {
        type: "warning",
      });
    }

    try {
      const btnUpdate = document.querySelector('.btnUpdate');
   
    btnUpdate.disabled = true;
    const res = await axios.post("http://localhost:3001/api/updateCoverPhoto", {
      coverUrlData: coverPhoto
    }, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get('userToken')
      }
    })
    const {success, msg} = res.data;
    btnUpdate.disabled = false;

    if(!success) {
      return toast(msg, {
        type: 'error'
      })
    }
    window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
    
  }

  return { handleChange, handleClick, updateCoverPicture};
}

export default UpdateCoverLogic;
