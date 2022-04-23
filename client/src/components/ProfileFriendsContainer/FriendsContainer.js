import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import { ProfileFriendsContainer } from "../../views/Profilepage/ProfileComponents";
import { Image } from "cloudinary-react";
import { EmptyStateMent } from "../NavBar/NavBar";

function FriendsContainer({id, setNumOfFriends}) {

  const [friends, setFriends] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:3001/api/getAllFriendsByUserId/${id}`, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get('userToken')
      }
    })
    const {friends} = res.data;
    const length = friends.length < 10 ? friends.length : 10;
    let friendsData = [];
    for(let i = 0; i < length; i++) {
      friendsData.push(friends[i]);
    }
    setNumOfFriends(friendsData.length);
    setFriends(friendsData);
    
  }, [])

  const fetchAllFriends = friends?.length > 0 ? friends?.map(friend => {
    const {id, profileUrl, lastname, firstname} = friend;
    return (
      <div className="grid-data" key={profileUrl}>
      <Image publicId={profileUrl} cloudName="iamprogrammer" onClick={() => window.location.assign(`/userProfile/${id}`)}/>
      <span onClick={() => window.location.assign(`/userProfile/${id}`)}>{firstname} {lastname}</span>
    </div>
    )
  }) : <EmptyStateMent>No Friends To Show</EmptyStateMent>

  return (
    <ProfileFriendsContainer>
      {
        fetchAllFriends
      }

    {/* <div className="grid-data" >
      <img src ="/images/nicePicture.jpg"/>
      <span>firstname lastname</span>
    </div> 

    mock data for maintenance
    
    */}

    </ProfileFriendsContainer>
  );
}

export default FriendsContainer;
