import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import LeftSideDrawer from "../../components/LeftSideDrawer/LeftSideDrawer";
import Myday from "../../components/MyDay/Myday";
import PostBox from "../../components/PostBox/PostBox";
import PostBoxModal from "../../components/PostBox/PostBoxModal";
import { SideContainer } from "../../components/SideContainer/SideContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StatusBox from "../../components/NewsfeedStatus/StatusBox";
import { HomeContainer } from "./HomeContainer";
import axios from "axios";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import ChatBox from "../../components/ChatBox/ChatBox";
import UpdatePostBox from "../../components/PostBox/UpdatePostBox";
import HomeLogic from "./HomeLogic";
import DeletePostBox from "../../components/PostBox/DeletePostBox";
import SharePostBox from "../../components/PostBox/SharePostBox";
import VideoCall from "../VideoCall/VideoCall";
import { Context } from "../../components/Context/Call";
import CallingPopup from "../VideoCall/CallingPopup";

function Home() {
  // modal
  const [openPostModal, setOpenPostModal] = useState(false);
  // const [postId, setPostId] = useState(null);

  // newsfeedstatus
  const [newsfeedStatus, setNewsfeedStatus] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const dispatch = useDispatch();

  // const { editPostBox } = HomeLogic({dispatch})
  const post = useSelector(state => state.postIdReducer);

  const { callAccepted, isReceivingCall, peerConnectionRef } = useContext(Context);
  // const socket = useSelector((state) => console.log(state.socketReducer));
  useEffect(async () => {
    setNewsfeedStatus([]);
    const res = await axios.get(
      "http://localhost:3001/api/getAllFriendsStatus",
      {
        withCredentials: true,
        headers: {
          accesstoken: Cookies.get("userToken"),
        },
      }
    );


    const { success, msg, newsFeedStatus } = res.data;
    if (!success) {
      return toast(msg, {
        type: "error",
      });
    }
    
    const statusModifiedLikesJson = newsFeedStatus.map(status => {
      status.likes = status?.likes?.split(',');
            let likes = [];

            for (let i = 0; i < status?.likes.length; i+= 2) { // converting array of json to array of objects
                likes.push(JSON.parse(`${status.likes[i]}, ${status.likes[i + 1]}`));
            }
            status.likes = likes;

            return status;
    })
    setNewsfeedStatus(statusModifiedLikesJson);
    
  }, [refresher]);

  return (
    <HomeContainer>

      {
        isReceivingCall && !callAccepted && <CallingPopup />
      }
      
      <VideoCall onSession={callAccepted} />

      
      <ToastContainer autoClose={1500} />
      <SideContainer bg="rgb(248,249,251)" flex="1" className="left"> {/* start */}

        <LeftSideDrawer />

      </SideContainer>  {/* end */}
     
      <SideContainer bg="rgb(248,249,251)" flex="2" className="mid"> {/* start */}
        
        <Myday />

        <PostBox
          setOpenPostModal={setOpenPostModal}
          openPostModal={openPostModal}
        />
      
      {/* posting modal */}
        {
            openPostModal && (
              <PostBoxModal
              refresher={refresher}
              setRefresher={setRefresher}
              toast={toast}
              setOpenPostModal={setOpenPostModal}
            />
          )
        }

        {
          /* editing post modal */
          post?.action == "edit" && 
          <UpdatePostBox 
          post={post?.post} 
          dispatch={dispatch} 
          setRefresher={setRefresher}
          refresher={refresher}
          toast={toast}
          setNewsfeedStatus={setNewsfeedStatus}
          />
        }

        {
          post?.action == "share" && 
          <SharePostBox
          post={post?.post} 
          dispatch={dispatch}
          setRefresher={setRefresher}
          refresher={refresher}
          toast={toast}
          setNewsfeedStatus={setNewsfeedStatus}
          />
        }

        {
          /* deleting post modal */
          post?.action == "delete" && 
          <DeletePostBox
          postId={post?.postId}
          dispatch={dispatch}
          setRefresher={setRefresher}
          refresher={refresher}
          setNewsfeedStatus={setNewsfeedStatus}
          toast={toast}
          />
        }
        
        {
        newsfeedStatus
          .map((status) => {
            return <StatusBox status={status} key={status.id}/>;
          })
        }
      </SideContainer>

      {/* end */}

        <SideContainer bg="rgb(248,249,251)" flex="1" className="right">
        {/* start */}

      </SideContainer>

      {/* end */}

    </HomeContainer>
  );
}

export default Home;
