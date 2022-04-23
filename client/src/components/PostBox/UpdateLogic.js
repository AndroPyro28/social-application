import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import {removePostId} from '../../redux/actions/postId';
let isChanged = false;
function UpdateLogic({ setPost, refresher, setRefresher, post, toast, dispatch, setNewsfeedStatus}) {
  
  const handleChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRemoveData = (e) => {

    if(!post.prevUrl) {
        setPost((prev) => ({ 
            ...prev, 
            [e.target.name]: null, 
            type: "",
            prevUrl: prev.dataUrl,
            prevType: prev.type
        }));
    }
    else {
        setPost((prev) => ({ 
            ...prev, 
            [e.target.name]: null, 
            type: "",
        }));
    }
        
}

  const handleSetFile = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = async () => {
        
        if(!post.prevUrl) {
            setPost((prev) => ({
                ...prev,
                [e.target.name]: reader.result,
                prevUrl: prev.dataUrl,
                prevType: prev.type,
                type: "",
              }));
        }
        else {
            setPost((prev) => ({
                ...prev,
                [e.target.name]: reader.result,
                type: "",
              }));
        }
    };
  };

  const updatePost = async (post) => {

    const isInvalidData = post?.dataUrl?.includes("image") || post?.dataUrl?.includes("video"); 

    if(isChanged && !isInvalidData && post?.type != "text") {
        return toast("file must be photo or video", {type: "error"})
    }
    if(!post.postContent && !post.dataUrl) {
      return toast("You must post a any content", {type: "error"})
    }

    const button = document.querySelector('.btnSubmit');

    button.disabled = true;
    const res = await axios.post(`http://localhost:3001/api/updatePost`, post, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get("userToken"),
      },
    });

    const {success} = res.data;

    if(success) {
        setRefresher(!refresher);
        toast('Post updated', {
          type: "success"
        })
        button.disabled = false;
        dispatch(removePostId());
    }
    
    
  };

  return { handleChange, handleRemoveData, handleSetFile, updatePost };
}

export default UpdateLogic;
