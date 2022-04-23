import React, { useEffect, useState } from 'react'
import {
    ProfileBodyContainer,
    ProfilePostsContainer,
    ProfileInfoContainer,
    ProfileIntroContainer,
  } from "../../views/Profilepage/ProfileComponents";
import PostBox from "../PostBox/PostBox";
import StatusBox from "../NewsfeedStatus/StatusBox";
import FriendsContainer from "../ProfileFriendsContainer/FriendsContainer";
import { useSelector } from 'react-redux';


function UserNewsFeed({userData, numOfFriends, id, setNumOfFriends, setOpenPostModal, openPostModal, posts}) {

    const {currentUser} = useSelector(state => state.userReducer);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
      setUserInfo(userData);
    }, [userData])
  return (
    <ProfileBodyContainer> {/* start of profile posts container */}
        
    <ProfileInfoContainer>
        
      <ProfileIntroContainer>
        <h3>INTRO</h3>
        <div>{userInfo?.email}</div>
        <div>{userInfo?.address}</div>
        <div>{userInfo?.age ? userInfo?.age : '---' }</div>
      </ProfileIntroContainer>

      <h3>Friends ({numOfFriends})</h3> 

      <FriendsContainer id = {id} setNumOfFriends={setNumOfFriends}/> {/* we isolate the friends container to useEffect customly */}

    </ProfileInfoContainer>

    <ProfilePostsContainer>
      {
        currentUser.id == id && (<PostBox
        setOpenPostModal={setOpenPostModal}
        openPostModal={openPostModal}
    />)
      }

      {
       posts?.length > 0 ? posts?.slice(0).reverse().map((post, index) => {
          post.firstname = userInfo?.firstname;
          post.lastname = userInfo?.lastname;
          post.profileUrl = userInfo?.profileUrl;
          return <StatusBox status={post} key={index} />
        }) : <div>No Posted yet</div>
      }
      
    </ProfilePostsContainer>
    
  </ProfileBodyContainer> /* end of profile posts container */
  )
}

export default UserNewsFeed