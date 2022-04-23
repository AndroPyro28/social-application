import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { PostBoxModalBackdrop, PostBoxOptions } from "./PostBoxModal.style";
import Cookies from 'js-cookie';
import axios from 'axios';
import {format} from "timeago.js"
import {
    UpdatePostBoxContainer,
    UpdateHeaderContainer,
    UpdateBodyContainer,
  } from "./updatePostBoxComp";
  import SharePostBoxLogic from './SharePostBoxLogic';
  import { SharedContentContainer, ContentPostByUser } from './SharePostBoxComp';
import { Image, Video } from 'cloudinary-react';
import {removePostId} from "../../redux/actions/postId"
import {useSelector} from "react-redux";

function SharePostBox({post:chosenPost, dispatch, setRefresher, refresher, toast, setNewsfeedStatus}) {
  const socket = useSelector(state => state.socketReducer)

    const [postContent, setPostContent] = useState("");
    const [post, setPost] = useState()
    const {handleChange, sharePost} = SharePostBoxLogic({setPostContent, post, postContent, toast, setRefresher, dispatch, socket})

  useEffect(() => {
    setPost(chosenPost)
  }, [])

    // useEffect(async () => {
    //     const res = await axios.get(`http://localhost:3001/api/getPost/${postId}`, {
    //       withCredentials: true,
    //       headers: {
    //         accesstoken: Cookies.get("userToken"),
    //       },
    //     });
    //     setPost(res.data.status);
    //   }, []);

  return (
    <PostBoxModalBackdrop>
        <ToastContainer autoClose={3000}/>
        <i className="fa-solid fa-circle-xmark closeBtn" onClick={() => dispatch(removePostId())}></i>
        <UpdatePostBoxContainer>

                <UpdateHeaderContainer><h2>Share Post</h2></UpdateHeaderContainer>

                <UpdateBodyContainer>

                <textarea
                placeholder='Share Content...'
                value={postContent}
                name="postContent"
                onChange={handleChange} />

                <SharedContentContainer>

                {
                    post?.type == "image" && (
                        <Image publicId={post?.dataUrl} cloudName="iamprogrammer" />
                    )
                }

                {
                    post?.type == "video" && (
                        <Video publicId={post?.dataUrl} cloudName="iamprogrammer" controls="controls autoplay"/>
                    )
                }

                <ContentPostByUser>
                    <strong>{post?.firstname} {post?.lastname}</strong>
                    <span><i className="fa-solid fa-clock"></i> {format(post?.created_at)}</span>
                    
                    <p>{post?.postContent}</p>
                </ContentPostByUser>

                </SharedContentContainer>

                <PostBoxOptions style={{ width: "90%"}} disabled = {true} title="This feature is not supported.">
                    <h5  disabled = {true}>  <i className="fa-solid fa-file-image"></i> + </h5>
                    <input type="file" name="dataUrl" multiple accept="image/* video/*" disabled = {true} />
                </PostBoxOptions>

                </UpdateBodyContainer>
        
        <button className="btnSubmit" onClick={sharePost}>Share</button>

        </UpdatePostBoxContainer>

    </PostBoxModalBackdrop>
  )
}

export default SharePostBox