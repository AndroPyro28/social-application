import React from 'react'
import {FriendsContainer} from "./ActiveListComponent";
import { useSelector, useDispatch } from 'react-redux';
import {Image} from 'cloudinary-react';
import activeListLogic from './activeListLogic';

function Friends({friend}) {

  const dispatch = useDispatch();

  const {id ,firstname, lastname, profileUrl, isOnline} = friend;
  const socket = useSelector(state => state.socketReducer);

  const { openChatBox } = activeListLogic({socket, dispatch});
  return (
    <FriendsContainer onClick={() => openChatBox(id)}>
      <Image publicId={profileUrl} cloudName="iamprogrammer" />
        <span>{firstname} {lastname}</span>
        <i className={`fa-solid fa-circle ${isOnline ? `online__friend` : `offline__friend`} `}></i>
    </FriendsContainer>
  )
}

export default Friends