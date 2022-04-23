import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const postBoxLogic = ({
  postContent,
  postData="",
  setPostData,
  toast,
  setOpenPostModal,
  refresher,
  setRefresher
}) => {
  const handleSetFile = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = async () => {
      setPostData(reader.result);
      
    };
  };

  const handleSubmit = async () => {
    const button = document.querySelector('.btnSubmit');
    if (!postData && !postContent) {

      return toast("Posting something is required to upload", {
        type: "error",
      });
    }

    let type = '';

    const isInvalidData = postData?.includes("image") || postData?.includes("video");

    type = postData?.includes("image") ? "image" : "video";

    if (!isInvalidData && postData) {
      
      return toast("Invalid type of photo", {
        type: "error",
      });
    }
    button.disabled = true;
        const res = await axios.post(
          "http://localhost:3001/api/post",
          {
            dataUrl: postData ? postData : '',
            postContent,
            dataType: type ? type : '',
          },
          {
            withCredentials: true,
            headers: {
              accesstoken: Cookies.get("userToken"),
            },
          }
        );
        const { success, msg } = res.data;

        if (success) {
          setOpenPostModal(false)
          setRefresher(!refresher)
          button.disabled = false;
          return toast(msg, {
            type: "success",
          }); 
        }
        return toast(msg, {
          type: "error",
        }); 
  };
  return { handleSubmit, handleSetFile };
};

export default postBoxLogic;
