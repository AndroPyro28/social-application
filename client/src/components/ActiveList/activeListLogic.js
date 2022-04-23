import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import {chatboxToggle} from '../../redux/actions/chatbox'

function activeListLogic({socket, dispatch}) {

    const openChatBox = async (userId) => {

        const res = await axios.get(`http://localhost:3001/api/getMessagesByUserId/${userId}`, {
            withCredentials: true,
            headers: {
                accesstoken: Cookies.get('userToken')
            }
        })
        dispatch(chatboxToggle(false))
        dispatch(chatboxToggle(true, res.data.chatData))
    }

  return {
    openChatBox
  }
}

export default activeListLogic