import { useParams } from "react-router-dom";
import {UserPostContainer, PostContainer} from "./UserPostComponents.js"
import StatusBox from "../../components/NewsfeedStatus/StatusBox"
import { useEffect, useState, useContext } from "react";
import { Context } from "../../components/Context/Call.js";
import axios from "axios";
import Cookies from "js-cookie";
import VideoCall from "../VideoCall/VideoCall.js";
import CallingPopup from "../VideoCall/CallingPopup.js";

function UserPost() {
  const { postId } = useParams();
  console.log(postId)
  const [post, setPost] = useState({});

  useEffect(async () => {
    const res = await axios.get(`http://localhost:3001/api/getPost/${postId}`, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get('userToken')
      }
    })

    const { status } = res.data;
        status.likes = status?.likes?.split(',');
            let likes = [];

            for (let i = 0; i < status?.likes.length; i+= 2) { // converting array of json to array of objects
                likes.push(JSON.parse(`${status.likes[i]}, ${status.likes[i + 1]}`));
            }
            status.likes = likes;
            setPost(status); // diko makuha to
  }, []);

  const { callAccepted, isReceivingCall, peerConnectionRef } = useContext(Context);

  return <UserPostContainer> 

    {
        isReceivingCall && !callAccepted && <CallingPopup />
      }
      
      <VideoCall onSession={callAccepted} />  
      
      <PostContainer>
          {
            post.id && <StatusBox status={post} />
          }
      </PostContainer>
  </UserPostContainer>;

}

export default UserPost;
