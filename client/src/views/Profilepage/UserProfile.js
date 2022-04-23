import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import UpdateCoverPhotoModal from "./UpdateCoverPhotoModal";
import UpdateProfilePhotoModal from "./UpdateProfilePhotoModal";
import PostBoxModal from "../../components/PostBox/PostBoxModal";
import LoadingComp  from "../../components/LoadingStyle/LoadingComp";
import {
  ProfileContainer,
  ProfileHeader,
  ProfileHeaderContainer,
  ProfileUserName,
  ProfileInfoButtonsContainer,
  UpdateCoverButton,} from "./ProfileComponents";
import axios from "axios";
import { Context } from "../../components/Context/Call";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import userProfileLogic from "./userProfileLogic";
import UserNewsFeed from "../../components/UserMedia/UserNewsFeed";
import UpdatePostBox from "../../components/PostBox/UpdatePostBox";
import DeletePostBox from "../../components/PostBox/DeletePostBox";
import SharePostBox from "../../components/PostBox/SharePostBox";
import UserPhotos from "../../components/UserMedia/UserPhotos";
import UserVideos from "../../components/UserMedia/UserVideos";
import VideoCall from "../VideoCall/VideoCall";
import CallingPopup from "../VideoCall/CallingPopup";

function UserProfile() {
  //{
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userReducer);
  const reduxRefresher = useSelector((state) => state.refresherReducer);
  const socket = useSelector((state) => state.socketReducer);
  const [refresher, setRefresher] = useState(false);
  const [userData, setUserData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [profileModal, setProfileModal] = useState(false);
  const [coverModal, setCoverModal] = useState(false);

  const [numOfFriends, setNumOfFriends] = useState(0);

  const [openPostModal, setOpenPostModal] = useState(false);
  const post = useSelector(state => state.postIdReducer)

  const [loading, setLoading] = useState(true);

  // content provider
  const [pageContent, setPageContent] = useState("posts")

  const {addFriend, cancelFriendRequest, confirmFriendRequest, openChatBox, changePageContent} = userProfileLogic({socket, id, setUserData, setRefresher, refresher, dispatch, setPageContent});
//}
  useEffect(async () => {
    setUserData([]);
    setPosts([]);
    setLoading(true);
    const res = await axios.get(`http://localhost:3001/api/userProfile/${id}`, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get("userToken"),
      },
    });
    const { success, userData, msg } = res.data;
    if (!success) {
       window.history.back();
    } else {
      setLoading(false);

      setUserData(userData);

      const status = userData.posts.filter(post => post.id != null)

      const statusModifiedLikesJson = status.map(status => {

        status.likes = status?.likes?.split(',');
              let likes = [];
  
              for (let i = 0; i < status?.likes.length; i+= 2) { // converting array of json to array of objects
                  likes.push(JSON.parse(`${status.likes[i]}, ${status.likes[i + 1]}`));
              }
              status.likes = likes;
  
              return status;
      })

      setPosts(statusModifiedLikesJson);
    }
  }, [refresher, reduxRefresher]);

  const { callAccepted, isReceivingCall, peerConnectionRef } = useContext(Context);


  return (
    loading ? <LoadingComp/> :
    <ProfileContainer>
      {
        isReceivingCall && !callAccepted && <CallingPopup />
      }
      
      <VideoCall onSession={callAccepted} />

      <ToastContainer autoClose={3000}/>
      {profileModal && (
        <UpdateProfilePhotoModal setProfileModal={setProfileModal} />
      )}

      {coverModal && <UpdateCoverPhotoModal setCoverModal={setCoverModal} />}

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
          setNewsfeedStatus={setPosts}
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
          setNewsfeedStatus={setPosts}
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
          setNewsfeedStatus={setPosts}
          toast={toast}
          />
        } 


      <ProfileHeaderContainer>
        <ProfileHeader>
          <Image
            className="imgCover"
            publicId={userData?.coverUrl}
            cloudName="iamprogrammer"
          />

          {currentUser.id == userData?.id && (
            <UpdateCoverButton onClick={() => setCoverModal(true)}>
              <i className="fa-solid fa-panorama"></i>
            </UpdateCoverButton>
          )}
          <Image
            className="imgProfile"
            publicId={userData?.profileUrl}
            cloudName="iamprogrammer"
          />
          {currentUser.id == userData?.id && (
            <i
              className="fa-solid fa-camera"
              onClick={() => setProfileModal(true)}
            ></i>
          )}
        </ProfileHeader>

        <ProfileUserName>{`${userData?.firstname} ${userData?.lastname}`}</ProfileUserName>

        <ProfileInfoButtonsContainer>
          <div>

            <a onClick={changePageContent} className={pageContent == "posts" ? "active" : ""}>Posts</a>
            <a onClick={changePageContent} className={pageContent == "about" ? "active" : ""}>About</a>
            <a onClick={changePageContent} className={pageContent == "friends" ? "active" : ""}>Friends</a>
            <a onClick={changePageContent} className={pageContent == "photos" ? "active" : ""}>Photos</a>
            <a onClick={changePageContent} className={pageContent == "videos" ? "active" : ""}>Videos</a>

          </div>

          {currentUser.id != id && userData?.friendShipId && ( // if the current user is friended with this user
            <button>
              <i className="fa-solid fa-user-check"></i> Friend
            </button>
          )}

          {currentUser.id != id && !userData?.friendShipId && !userData?.userRelationId && ( //if the current user is not friended and not sent a request to this user
            <button onClick={addFriend}>
              <i className="fas fa-user-plus"></i> Add Friend
            </button>
          )}

          {currentUser.id != id && !userData?.friendShipId && userData?.userRelationId == id && ( // if the current user is not friend this user but sent a friend request to this user
            <button onClick={cancelFriendRequest}>
              <i className="fa-solid fa-user-xmark"></i> Cancel Request
            </button>
          )}

          {currentUser.id != id && !userData?.friendShipId && userData?.userRelationId == currentUser.id && ( //if this user sent a friend request to the current user
            
            <>
            <button onClick={confirmFriendRequest}>
              <i className="fas fa-user-plus"></i> Confirm
            </button>
            </>
          )}

          {currentUser.id === userData?.id && (
            <button>
              <i className="fa-solid fa-circle-plus"></i> Add Story
            </button>
          )}
          {
            currentUser.id !== userData?.id && (
              <button onClick={() => openChatBox(userData?.id)}><i className="fa-solid fa-comment"></i> Message</button>
            )
          }
        </ProfileInfoButtonsContainer>
      </ProfileHeaderContainer>


      {/* start of user content */}

          {
            pageContent == "posts" && <UserNewsFeed
            userData={userData}
            numOfFriends={numOfFriends}
            id={id}
            setNumOfFriends={setNumOfFriends}
            setOpenPostModal={setOpenPostModal}
            openPostModal={openPostModal}
            posts={posts}
          />
          }

          {
            pageContent == "photos" && <UserPhotos
            userData={userData}
            userId = {id}
            />
          }

          {
            pageContent == "videos" && <UserVideos
            userData={userData}
            userId = {id}
            />
          }
      
    </ProfileContainer>
  );
}

export default UserProfile;
