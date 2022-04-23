import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import {removePostId} from "../../redux/actions/postId"

function SharePostBoxLogic({setPostContent, post, postContent, toast, setRefresher, dispatch, socket}) {
  const handleChange = (e) => {
    setPostContent(e.target.value)
  }

  const sharePost = async () => {
    try {
      
    //   const button = document.querySelector('.btnSubmit');
    //   button.disabled = true;
    //   const res = await axios.post(`http://localhost:3001/api/sharePost`, {
    //   post,
    //   postContent
    // }, {
    //   withCredentials: true,
    //   headers: {
    //     accesstoken: Cookies.get('userToken')
    //   }
    // })
    // const {success, msg} = res.data;

    // if(success) {
    //   button.disabled = false
      
    // }

      setRefresher(prev => !prev)
      dispatch(removePostId());

      socket.emit('sharePost', {
        post,
        postContent,
        accesstoken: Cookies.get('userToken')
      })

      return toast("Post shared to newsfeed...", {
        type: "success"
      })

    } catch (error) {
      console.error(error.message);
    }
    
  }
  return { handleChange, sharePost }
}

export default SharePostBoxLogic