import axios from "axios";
import { Image, Video } from "cloudinary-react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { PostBoxModalBackdrop, PostBoxOptions } from "./PostBoxModal.style";
import UpdateLogic from "./UpdateLogic";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  UpdatePostBoxContainer,
  UpdateHeaderContainer,
  UpdateBodyContainer,
} from "./updatePostBoxComp";
import {getPostId, removePostId} from "../../redux/actions/postId"

function UpdatePostBox({ post:chosenPost, dispatch, refresher, setRefresher}) {
  const [post, setPost] = useState();
  const { handleChange, handleRemoveData, handleSetFile, updatePost} = UpdateLogic({
    toast,
    post,
    setRefresher,
    refresher,
    setPost,
    dispatch
  });

  useEffect(() => {
    setPost(chosenPost);
  },[]);
  
  // useEffect(async () => {
  //   const res = await axios.get(`http://localhost:3001/api/getPost/${postId}`, {
  //     withCredentials: true,
  //     headers: {
  //       accesstoken: Cookies.get("userToken"),
  //     },
  //   });
  //   setPost(res.data.status);
  // }, []);

  return (
    <PostBoxModalBackdrop>
      <ToastContainer autoClose={3000} />
      <i className="fa-solid fa-circle-xmark closeBtn" onClick={() => dispatch(removePostId())}></i>
      <UpdatePostBoxContainer>
        <UpdateHeaderContainer>
          <h2>Edit Post</h2>
        </UpdateHeaderContainer>

        <UpdateBodyContainer>
          <textarea
            placeholder="Edit Content..."
            value={post?.postContent}
            name="postContent"
            onChange={handleChange}
          />
          {
            post?.type == "image" && post?.dataUrl && (
            <Image
              controls="controls autoplay"
              publicId={post.dataUrl}
              cloudName="iamprogrammer"
              title="Click to remove"
              onClick={handleRemoveData}
              name="dataUrl"
            />
          ) 
        }

        {
           post?.type == "" && post?.dataUrl?.includes("image") && (
               <img src={post?.dataUrl} onClick={handleRemoveData} name="dataUrl" />
           ) 
        }

        {
          post?.type == "video" && post?.dataUrl &&(
            <Video
              controls="controls autoplay"
              publicId={post.dataUrl}
              cloudName="iamprogrammer"
              title="Click to remove"
              onClick={handleRemoveData}
              name="dataUrl"
            />
          )
        }

        {
           post?.type == "" && post?.dataUrl?.includes("video") && (
               <video src={post?.dataUrl} onClick={handleRemoveData} name="dataUrl" controls="controls autoplay" />
           ) 
        }

          <PostBoxOptions style={{ width: "90%"}} >
            <h5>  <i className="fa-solid fa-file-image"></i> + </h5>
            <input type="file" name="dataUrl" onChange={handleSetFile} multiple accept="image/* video/*" />
          </PostBoxOptions>

        </UpdateBodyContainer>

        <button className="btnSubmit" onClick={() => updatePost(post)}>Save</button>

      </UpdatePostBoxContainer>
    </PostBoxModalBackdrop>
  );
}

export default UpdatePostBox;
